#!/bin/bash

#
# Main deployment script; this calls main-deploy.js, and executes these in order. A hacky solution to bring order to chaos
#

headline () {
  #ANSI Escape Code styling
  border="\e[1;34m=========================="
  echo -e $border
  echo -e "Stage $1 - COMPLETE"
  echo -e $border
  # Reset coloring
  echo -e "\e[0m"
}

#node ./main-deploy.js --stage 1
headline 1



echo "end of script"

##########################


