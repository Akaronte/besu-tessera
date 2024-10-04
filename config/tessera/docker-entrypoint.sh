#!/bin/sh
echo $TESSERA_MODE
echo $TESSERA_HOSTNAME
exec /tessera/bin/tessera -configfile /data/tessera-config.json