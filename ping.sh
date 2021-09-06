current_date=$(date)
last_server1_ping=$(curl --max-time 2 -s -o /dev/null -w '%{http_code}' 119.18.0.11:9800/status)
last_server2_ping=$(curl --max-time 2 -s -o /dev/null -w '%{http_code}' 119.18.0.22:9800/status)
history_server1_ping=$(curl --max-time 2 -s -o /dev/null -w '%{http_code}' 119.18.0.11:9800/status)
history_server2_ping=$(curl --max-time 2 -s -o /dev/null -w '%{http_code}' 119.18.0.22:9800/status)

echo "$last_server1_ping $current_date" > $PWD/dataLogs/lastLogServer1.log
echo "$last_server2_ping $current_date" > $PWD/dataLogs/lastLogServer2.log
echo "$history_server1_ping $current_date" >> $PWD/dataLogs/historyServer1.log
echo "$history_server2_ping $current_date" >> $PWD/dataLogs/historyServer2.log