SHELL := /bin/bash
PWD=$(shell pwd)
SRC_DIR=${PWD}/src
BUILD_DIR=${PWD}/build
QUIZ_DIR=quiz
STATUS=0

all: build 

build: clean create-build-dir create-quiz-dir copy-quiz-sources

create-build-dir: 
	mkdir -p ${BUILD_DIR}

create-quiz-dir:
	(cd ${BUILD_DIR}; mkdir -p ${QUIZ_DIR}) 

copy-quiz-sources:
	cp -rf ${SRC_DIR}/* ${BUILD_DIR}/quiz/

clean:
	rm -rf ${BUILD_DIR}

run :
	(cd build; python3 -m http.server)


