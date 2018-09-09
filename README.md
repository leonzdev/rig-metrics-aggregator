# rig-metrics-aggregator

* How to run
```shell
export APP_INSIGHTS_INS_KEY=<instrumentationKey>
export RIG_0_NAME=<rig name>
export RIG_0_HOST=<rig ip or hostname>
export RIG_0_PORT=<xmrstak port>
export NICEHASH_0_ADDRESS=<nicehash address>
node index.js
```

* Docker

  Images
  * Raspbian: https://hub.docker.com/r/leonzdev/rig-metrics-aggregator-raspbian/

  Run as service
  ```shell
  # Create a container
  sudo docker create --name=rig-metrics-aggregator \
    -e SCHEDULE="0 */2 * * * *" \
    -e APP_INSIGHTS_INS_KEY=<key> \
    -e RIG_0_NAME=<name> \
    -e RIG_0_HOST=<host> \
    -e RIG_0_XMRSTAK_PORT=<port> \
    -e RIG_0_OPENHW_PORT=<port> \
    -e NICEHASH_0_ADDRESS=<address> \
    leonzdev/rig-metrics-aggregator-raspbian:latest

  # Add service file
  sudo cp ./rig-metrics-aggregator.service /etc/systemd/system

  # Enable service
  sudo systemctl enable rig-metrics-aggregator

  # Start service
  sudo systemctl start rig-metrics-aggregator
  ```