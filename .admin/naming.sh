for dir in $(find ./../ -mindepth 3 -maxdepth 3 -type d ! -path "./../.git*"); do
	dir=${dir#./}

	# Extract the language, framework, and project names from the directory path
	language=$(echo $dir | cut -d'/' -f2)
	framework=$(echo $dir | cut -d'/' -f3)
	project=$(echo $dir | cut -d'/' -f4)

	# Generate the project name and description
	projectName="superviz-$project-$framework-$language"
	normalizedProjecName=$(echo $project | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')
	normalizedProjecName=$(echo $normalizedProjecName | sed 's/Html/HTML/g' | sed 's/Superviz/SuperViz/g')
	techs=$(echo "($(echo $framework | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')/$language)" | sed 's/ts/TypeScript/g' | sed 's/js/JavaScript/g' | sed 's/html/HTML/g' | sed 's/cdn/CDN/g')
	description="This is a sample project for the $normalizedProjecName, based on $framework ($language), for more information, go to docs.superviz.com"
	fullProjectName=$(echo "$normalizedProjecName $techs" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')

	# Update the "name" and "description" properties in the package.json file
  jq --arg projectName "$projectName" --arg description "$description" '.name = $projectName | .description = $description' $dir/package.json > $dir/package.temp.json && mv $dir/package.temp.json $dir/package.json

	# Update first line of every README.md file
	sed -i "1s|.*|# Sample for $fullProjectName|" $dir/README.md

	# COPY the README.md file from the .admin folder to the project folder
	# cp ./../.admin/README.md $dir/README.md

	# Update the sampleInfo file
	if [ $language == "ts" ]; then
		echo "export const sampleInfo = { id: '$projectName', name: '$fullProjectName' };" > $dir/src/projectInfo.ts
	fi

	if [ $language == "js" ]; then
		if [ $framework == "cdn" ]; then
			echo "export const sampleInfo = { id: '$projectName', name: '$fullProjectName' };" > $dir/public/projectInfo.js
		fi
		if [ $framework != "cdn" ]; then
			echo "export const sampleInfo = { id: '$projectName', name: '$fullProjectName' };" > $dir/src/projectInfo.js
		fi
	fi

	echo "Updated $fullProjectName"
done