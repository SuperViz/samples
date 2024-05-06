for dir in $(find ./../ -mindepth 3 -maxdepth 3 -type d ! -path "./../.git*"); do
	dir=${dir#./}
	language=$(echo $dir | cut -d'/' -f2)
	project=$(echo $dir | cut -d'/' -f4)

	#start counting time
	start=$(date +%s)

	if [[ $language == "ts" ]]; then
		cd "$dir"
		framework=$(echo $dir | cut -d'/' -f3)

		echo "👀 Updating package for $dir"
	
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

		echo "🏗️ Building $dir"
		yarn build
		echo "✅ Built $dir"

		end=$(date +%s)
		runtime=$((end-start))
		echo "⏱️  Runtime: $runtime seconds"

		echo " "

		# end of the loop
	fi

done

#end counting time
end=$(date +%s)
runtime=$((end-start))
echo "⏱️  Runtime: $runtime seconds"