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

a=0
b=1

# node output:
# 
# Node.js script
# ===============
# A: [Value of A passed]
# B: [Value of B passed]
# C: [A + B]


# Read output, loop for C value
node $main --a 1 --b 2

# Print in BASH as well
headline a b

# Take B and C, and funnel it back into node


# PID=$!
# sudo kill -INT $PID


echo "end of script"

##########################


