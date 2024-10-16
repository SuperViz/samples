import { DEVELOPER_KEY } from '../env.js'
import { sampleInfo } from '../projectInfo.js'

let realtime
let channel

const participant = String(Math.floor(Math.random() * 100))
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
	if (message.participantId === participant.toString()) return

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
	realtime = new window.Realtime(DEVELOPER_KEY, {
		participant: {
			id: participant,
			name: 'John ' + participant,
		},
	})

	channel = await realtime.connect(groupId)
}

initializeSuperVizRoom()
