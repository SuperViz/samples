import './style.css'
import { Realtime } from '@superviz/realtime'
import { sampleInfo } from './projectInfo'

let realtime
let channel

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY

const participant = Math.floor(Math.random() * 100)
	.toString()
	.padStart(3, '0')
const groupId = sampleInfo.id

document.getElementById('subscribe').addEventListener('click', subscribeToEvents)
document.getElementById('publishButton').addEventListener('click', publishEvent)

function setLastPublishedMessage(message) {
	document.getElementById('lastElement').innerHTML = `
    <p><strong>Last message:</strong> <span>${message.data?.toString()}</span></p>
    <p><strong>Published via:</strong> <span>${message.name}</span></p>
    <p><strong>Published by:</strong> <span>${message.participantId}</span></p>
  `
}

function callbackFunctionForWhenTheEventIsDispatched(message) {
	if (typeof message === 'string') return

	if (message.participantId === participant) return

	setLastPublishedMessage(message)
}

function subscribeToEvents() {
	channel.subscribe('one', callbackFunctionForWhenTheEventIsDispatched)
	channel.subscribe('two', callbackFunctionForWhenTheEventIsDispatched)
	channel.subscribe('three', callbackFunctionForWhenTheEventIsDispatched)

	document.getElementById('subscribedTo').innerHTML = `<h2>Subscribed to:</h2>
          <code>one</code>
          <code>two</code>
          <code>three</code>`
	document.getElementById('eventName').disabled = false
}

function publishEvent() {
	const eventDropdown = document.getElementById('eventName')
	const messageInput = document.getElementById('eventMessage')

	const eventName = eventDropdown.value
	const messageToPublish = messageInput.value

	if (!eventName || !messageToPublish) return

	channel.publish(eventName, messageToPublish)
}

async function initializeSuperVizRoom() {
	realtime = new Realtime(DEVELOPER_KEY, {
		participant: {
			id: participant,
			name: 'John ' + participant,
		},
	})

	channel = await realtime.connect(groupId)
}

initializeSuperVizRoom()
