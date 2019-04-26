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

split() {
  
  IFSSAVE=IFS
  IFS=$1
  read -ra output <<< "$output";
  # Reset IFS
  IFS=$IFSSAVE
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
output=$(node $main -a 1 -b 2)
echo "AAAA $output"
# Call split with \n, which will take output and cut it for us
split "\n"

echo "ZXFREWQ  ${#output[@]}"

#echo "meme";
for i in "${output[@]}"; do # access each element of array
  zoot="$i"
  echo "HEY $zoot"
  if [[ "$zoot" == *"C:"* ]]; then
    echo "balls"
    echo "$i"
    echo "eee"
  fi
done

# Print in BASH as well
headline $a $b

# Take B and C, and funnel it back into node


# PID=$!
# sudo kill -INT $PID


echo "end of script"

##########################


