#!/bin/bash

cd "Client"
ng build
cd "..\Server"
nodemon server.js 