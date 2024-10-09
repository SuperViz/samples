import { SuperVizRoomProvider, useYjsProvider, YjsProvider } from '@superviz/react-sdk'
import { sampleInfo } from './projectInfo'
import * as Y from 'yjs'
import { useEffect, useRef } from 'react'

import ReactQuill, { Quill } from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { QuillBinding } from 'y-quill'
import QuillCursors from 'quill-cursors'

Quill.register('modules/cursors', QuillCursors)

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
	const quillRef = useRef<ReactQuill | null>(null)

	useEffect(() => {
		if (!provider || !quillRef.current) return

		const binding = new QuillBinding(ydoc.getText('quill'), quillRef.current.getEditor(), provider.awareness)

		return () => {
			binding.destroy()
		}
	}, [ydoc, provider])

	return (
		<>
			<YjsProvider doc={ydoc} />
			<ReactQuill
				placeholder='// Connect to the room to start collaborating'
				ref={quillRef}
				theme='snow'
				modules={{
					cursors: true,
					toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']],
					history: {
						userOnly: true,
					},
				}}
			/>{' '}
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
