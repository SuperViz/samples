import React from 'react'
import { SuperVizRoomProvider, useYjsProvider, YjsProvider } from '@superviz/react-sdk'
import { sampleInfo } from './projectInfo'
import * as Y from 'yjs'
import { Editor } from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import { MonacoBinding } from 'y-monaco'

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY
const groupId = sampleInfo.id
const groupName = sampleInfo.name
const participant = Math.floor(Math.random() * 100)
	.toString()
	.padStart(3, '0')

const ydoc = new Y.Doc()

const style = document.createElement('style')
style.id = 'sv-yjs-monaco'
document.head.appendChild(style)

function Room() {
	const { provider } = useYjsProvider()
	const [editor, setEditor] = useState(null)

	useEffect(() => {
		if (!provider || editor == null) return

		const binding = new MonacoBinding(ydoc.getText('monaco'), editor.getModel(), new Set([editor]), provider.awareness)

		return () => {
			binding.destroy()
		}
	}, [ydoc, provider, editor])

	return (
		<>
			<YjsProvider doc={ydoc} />

			<Editor
				defaultValue='// Connect to the room to start collaborating'
				defaultLanguage='typescript'
				onMount={(editor) => {
					setEditor(editor)
				}}
				options={{
					padding: {
						top: 32,
					},
				}}
				theme='vs-dark'
			/>
		</>
	)
}

function App() {
	return (
		<SuperVizRoomProvider
			developerKey={DEVELOPER_KEY}
			group={{
				id: groupId,
				name: groupName,
			}}
			participant={{
				id: participant,
				name: 'John ' + participant,
			}}
			roomId={groupId}
			environment='dev'>
			<Room />
		</SuperVizRoomProvider>
	)
}

export default App
