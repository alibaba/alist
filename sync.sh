#!/bin/sh

echo "clean noform tgz"
clean_build()
{
	rm -rf noform-*.tgz
	rm -rf package
	rm -rf tmppack	
}

clean_build # clean

mkdir tmppack
dir_name=`pwd`

# exmaples and dist is flag that should script install the latest package
if [[ -d "${dir_name}/examples" && -d "${dir_name}/dist" ]]; then
	echo "examples and dist exist, just build examples"
else
	echo "fetching noform@latest tgz"
	npm pack noform@latest # download npm package

	if [ "$?" -eq 0 ]; then
		echo "unziping noform.tgz"
		tar -zxvf noform-*.tgz 
		
		dist_path="${dir_name}/package/dist"
		examples_path="${dir_name}/package/examples"
		if [ -d $dist_path ]; then
			echo "dist exist, copy dist to tmp package"
			cp -r $dist_path "${dir_name}/tmppack/"
		fi

		if [ -d $examples_path ]; then
			echo "examples exist, copy examples to tmp package"
			cp -r $examples_path "${dir_name}/tmppack/"
		fi

		echo "copy dist and examples to docs"

		# start copy dist to docs
		cp -r "${dir_name}/tmppack/dist" "${dir_name}/"
		# start copy dist to examples
		cp -r "${dir_name}/tmppack/examples" "${dir_name}/"
	else 
		echo "fetching error, please try again"
		exit $?
	fi
fi

# install and build examples
echo "start installing && build for examples."
echo "current location is ${dir_name}/examples"
cd "${dir_name}/examples"

if [ ! -d "node_modules" ]; then
	echo "node_modules doesnt exist, start installing examples/node_modules"
	tnpm install
else
	echo "node_modules already exist skip install section"
fi

echo "start building examples"

npm run build
if [ "$?" -eq 0 ]; then
	echo "finised build examples, now remove node_modules"
	cd "${dir_name}"

	mkdir -p "${dir_name}/public/examples"
	cp -r "${dir_name}/examples/build" "${dir_name}/public/examples/"
	clean_build

	# now offically build
	echo "final building..."
	npm run build
	echo "build success"
else
	echo "build failed"
fi