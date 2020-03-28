#!/bin/bash

ROOT_DIR=$(realpath $(dirname $(realpath $0))/../)
NODE_BIN=$ROOT_DIR/node_modules/.bin

INPUT_FILE=$ROOT_DIR/proto/$1.proto
OUTPUT_DIR=$ROOT_DIR/server


node $NODE_BIN/grpc_tools_node_protoc \
  -I=$ROOT_DIR $INPUT_FILE \
  --js_out=import_style=commonjs,binary:$OUTPUT_DIR \
  --grpc_out=$OUTPUT_DIR \
  --plugin=protoc-gen-grpc=$NODE_BIN/grpc_tools_node_protoc_plugin