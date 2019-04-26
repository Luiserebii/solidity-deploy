#!/bin/bash

#
# Main deployment script; this calls main-deploy.js, and executes these in order. A hacky solution to bring order to chaos
#

headline () {
  # ANSI Escape Code styling
  border="\e[1;96m=========================="
  echo -e $border
  echo -e "Addition: $1 + $2 = $3"
  echo -e $border
  # Reset coloring
  echo -e "\e[0m"
}

main="./main-script.js"

a=1
b=2

node $main --stage



# PID=$!
# sudo kill -INT $PID

headline a b



echo "end of script"

##########################


