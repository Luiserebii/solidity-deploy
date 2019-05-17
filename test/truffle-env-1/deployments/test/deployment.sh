#!/bin/bash

#
# Main deployment script; this calls main-deploy.js, and executes these in order. A hacky solution to bring order to chaos
#

headline () {
  # ANSI Escape Code styling
  border="\e[1;96m=========================="
  echo -e $border
  echo -e "Stage $1 - COMPLETE"
  echo -e $border
  # Reset coloring
  echo -e "\e[0m"
}

main="./main-deploy.js"

node $main --stage 1

# PID=$!
# sudo kill -INT $PID

headline 1


node $main --stage 2
headline 2


node $main --stage 3
headline 3



echo "end of script"

##########################


