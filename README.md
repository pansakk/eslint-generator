# eslint-generator
Machine Learning cli engine for auto generating rules field in the eslint configuration file

## Contents
 1. [Procedure](#procedure)
 2. [Install](#install)
 3. [Usage](#usage)
 4. [Example](#example)

## Preriquisites
You have to install Python 2.x because it is required for installation of library @tensorflow/tfjs-node. Chech `python --version` and make sure to add Python to `$PATH`. 

If there are still problems when installing run from an Administrative script:

`$ npm --add-python-to-path='true' --debug install --global windows-build-tools`

For more details check the [tfjs-node/WINDOWS_TROUBLESHOOTING.md](https://github.com/tensorflow/tfjs-node/blob/master/WINDOWS_TROUBLESHOOTING.md)


## Install
You have to install globally. For installation run `npm install -g eslint-generator`


## Usage
Open a bash in your project's folder and type `eslint-generator generate`.

It will automatically complete your eslintrc file rules field. 
If you don't have already a file it will produce one with the default field values.

## Example
![](https://github.com/pansakk/eslint-generator/blob/master/img/Screenshot_1.png)

![](https://github.com/pansakk/eslint-generator/blob/master/img/Screenshot_2.png)

![](https://github.com/pansakk/eslint-generator/blob/master/img/Screenshot_3.png)
