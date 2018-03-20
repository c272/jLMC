# jLMC
*A Javascript port of "Little Man Computer", an archaic emulation and teaching effort.*

This is a Javascript port of the popular teaching program "Little Man Computer", which simulates a simple computer, using the CPU and RAM.
If you wish to run an assembly script using this project, you can convert it using the compiler. See the steps below on advice of converting your assembly to opcodes.

## LittleManScripts (.LMS)
For this project, the file format ".LMS" is used. This is an acronym for "Little Man Script", and is a set of addresses and opcodes, formatted using the two-digit address of the command, then by the command data. More information on command data can be found here: http://www.yorku.ca/sychen/research/LMC/LMCInstructions.html

To convert an Assembly script which uses plaintext commands into an LMS file, simply use the compiler provided with the release build, passing in your Assembly UTF-8 file as the first argument.

For example:
`node lmsc.js myScript.txt`

This will output a ".lms" file of the same name in the folder you're working in.

## LMC in Node
LittleManComputer requires Node 6 or above, and will not function properly otherwise.

The project is largely unfinished, however will be complete very quickly.
