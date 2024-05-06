for dir in $(find ./../ -mindepth 3 -maxdepth 3 -type d ! -path "./../.git*"); do
	language=$(echo $dir | cut -d'/' -f3)
	project=$(echo $dir | cut -d'/' -f5)
	framework=$(echo $dir | cut -d'/' -f4)

	if [[ $language == "ts" ]]; then
		cd $dir
		name=$(jq -r '.name' package.json)
		echo "📦 $name"
		echo "🆕 Updating package for $dir"
	
		# React specific updates
		if [[ $framework == "react" ]]; then
			yarn upgrade @superviz/react-sdk@beta
		fi 

		# Non-React specific updates
		if [[ $framework != "react" ]]; then
			if [[ $project == *"autodesk"* ]]; then
				yarn upgrade @superviz/autodesk-viewer-plugin@beta @superviz/sdk@beta
			fi

			if [[ $project == *"matterport"* ]]; then
				yarn upgrade @superviz/matterport-plugin@beta @superviz/sdk@beta
			fi

			if [[ $project == *"three"* ]]; then
				yarn upgrade @superviz/threejs-plugin@beta @superviz/sdk@beta
			fi

			if [[ $project != *"autodesk"* ]] && [[ $project != *"matterport"* ]] && [[ $project != *"three"* ]]; then
				yarn upgrade @superviz/sdk@beta
			fi
		fi 
		echo "🚀 Updated $dir"

		echo "👀 Checking types $dir"
		yarn check-types

		if [ $? -eq 1 ]; then
			echo "❌ Types check failed for $dir"
			exit 1
		fi
		cd -
		
		echo "✅ Checked $dir"
		echo " "
	fi

done