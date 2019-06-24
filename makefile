SHELL := /bin/bash
PWD=$(shell pwd)
SRC_DIR=${PWD}/src
BUILD_DIR=${PWD}/build
STATUS=0

all: build

build: 
	mkdir ${BUILD_DIR};rsync -avz --progress ${SRC_DIR}/* ${BUILD_DIR}

clean:
	rm -rf ${BUILD_DIR}

run :
	cd ${BUILD_DIR};python -m SimpleHTTPServer 8000


