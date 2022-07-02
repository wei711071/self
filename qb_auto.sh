#!/bin/sh
torrent_name=$1
content_dir=$2
root_dir=$3
save_dir=$4
files_num=$5
torrent_size=$6
file_hash=$7

# Web UI 帳號
qb_username="zxcv303366"
# Web UI 密碼
qb_password="weiwei"
# Web UI 地址
qb_web_url="http://localhost:9797"
# 吸血模式
leeching_mode="true"
# 日誌路徑
log_dir="/media/sdau/zxcv303366/qbauto"
# 指令前餟 選擇使用 rclone 或 gclone
prefix_cmd="rclone"
# rclone / gclone 路由
rclone_dest="gd"
# rclone / gclone 上傳線程（默認：4）
rclone_parallel="32"
# 添加標籤或分類，用於標記以上傳的種子
auto_del_flag="gclone"

if [ ! -d ${log_dir} ]
then
	mkdir -p ${log_dir}
fi

function qb_login(){
	# 登入前 檢查 Cookies 是否有效
	cookie=$(cat ${log_dir}/cookies.txt)
	temp=$(curl -s "${qb_web_url}/api/v2/torrents/info" --cookie ${cookie})
	if [ ${#temp} -ne 9 ] && [ ${#temp} != 0 ]
	then
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cookies有效，跳過登入。 cookie：${cookie}" >> ${log_dir}/login.log
		return
	else
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] Cookies無效，開始登入。 cookie：${cookie}" >> ${log_dir}/login.log
	fi

	# 登入
	cookie=$(curl -i --header "Referer: ${qb_web_url}" --data "username=${qb_username}&password=${qb_password}" "${qb_web_url}/api/v2/auth/login" | grep -P -o 'SID=\S{32}')
	if [ -n ${cookie} ]
	then
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] 登入成功！cookie：${cookie}" >> ${log_dir}/login.log

	else
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] 登入失敗！" >> ${log_dir}/login.log
	fi
	echo ${cookie} > ${log_dir}/cookies.txt
}

function qb_del(){
	if [ ${leeching_mode} == "true" ]
	then
		curl_result=$(curl -s "${qb_web_url}/api/v2/torrents/delete?hashes=${file_hash}&deleteFiles=true" --cookie ${cookie})
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] 種子刪除成功" >> ${log_dir}/qb.log
	else
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] 不自動刪除，已上傳種子" >> ${log_dir}/qb.log
	fi
}

function qb_add_auto_del_tags(){
	curl -X POST -d "hashes=${file_hash}&tags=${auto_del_flag}" "${qb_web_url}/api/v2/torrents/addTags" --cookie "${cookie}"
}

function qb_check_torrent(){
	sleep 3s
	torrent_status=$(curl -s "${qb_web_url}/api/v2/torrents/info?hashes=${file_hash}" --cookie "${cookie}" | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['state'])")
	echo "[$(date '+%Y-%m-%d %H:%M:%S')] 獲取種子狀態：${torrent_status}" >> ${log_dir}/qb.log
	case ${torrent_status} in
		"checkingUP")
			qb_check_torrent
			;;
		"downloading"|"stalledDL")
			echo "[$(date '+%Y-%m-%d %H:%M:%S')] 獲取種子狀態：重新下載中" >> ${log_dir}/qb.log
			exit
			;;
	esac
}

function rclone_copy(){
	if [ ${type} == "file" ]
	then
		rclone_copy_cmd=$(${prefix_cmd} -v copy --transfers ${rclone_parallel} --log-file  ${log_dir}/rclone.log "${content_dir}" ${rclone_dest}:/)
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] 檔案上傳完畢" >> ${log_dir}/qb.log
	elif [ ${type} == "dir" ]
	then
		rclone_copy_cmd=$(${prefix_cmd} -v copy --transfers ${rclone_parallel} --log-file ${log_dir}/rclone.log "${content_dir}"/ ${rclone_dest}:/"${torrent_name}")
		echo "[$(date '+%Y-%m-%d %H:%M:%S')] 資料夾上傳完畢" >> ${log_dir}/qb.log
	fi
}

if [ -f "${content_dir}" ]
then
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] 名稱：${torrent_name}" >> ${log_dir}/qb.log
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] 類型：檔案" >> ${log_dir}/qb.log
   type="file"
   qb_login
   qb_check_torrent
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] 種子狀態正常，開始上傳。" >> ${log_dir}/qb.log
   rclone_copy
   qb_login
   qb_add_auto_del_tags
   qb_del
elif [ -d "${content_dir}" ]
then
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] 名稱：${torrent_name}" >> ${log_dir}/qb.log
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] 種子類型：資料夾" >> ${log_dir}/qb.log
   type="dir"
   qb_login
   qb_check_torrent
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] 種子狀態正常，開始上傳。" >> ${log_dir}/qb.log
   rclone_copy
   qb_login
   qb_add_auto_del_tags
   qb_del
else
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] 未知類型，取消上傳" >> ${log_dir}/qb.log
fi

echo "種子名稱：${torrent_name}" >> ${log_dir}/qb.log
echo "內容路徑：${content_dir}" >> ${log_dir}/qb.log
echo "目錄：${root_dir}" >> ${log_dir}/qb.log
echo "保存路徑：${save_dir}" >> ${log_dir}/qb.log
echo "檔案數量：${files_num}" >> ${log_dir}/qb.log
echo "檔案大小：${torrent_size}Bytes" >> ${log_dir}/qb.log
echo "HASH:${file_hash}" >> ${log_dir}/qb.log
echo "Cookie:${cookie}" >> ${log_dir}/qb.log
echo -e "-------------------------------------------------------------\n" >> ${log_dir}/qb.log
