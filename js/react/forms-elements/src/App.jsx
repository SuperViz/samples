import { FormElements, SuperVizRoomProvider } from "@superviz/react-sdk";
import { sampleInfo } from "./projectInfo";

const DEVELOPER_KEY = import.meta.env.VITE_DEVELOPER_KEY;
const groupId = sampleInfo.id;
const groupName = sampleInfo.name;
const participant = Math.floor(Math.random() * 100).toString().padStart(3, "0");

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
        name: "John " + participant,
      }}
      roomId={groupId}
    >
      <div className="formelements">
        <h1>Generic Form</h1>
        <label>
          Name: <br />
          <input type='text' id='name' name='name' />
        </label>
        <label>
          Email: <br />
          <input type='email' id='email' name='email' />
        </label>
        <label>
          What is your kind of pet?
          <div className='radio-option'>
            <span>
              <input type='radio' name='pet' value='cat' id='cat' /> Cat
            </span>
            <span>
              <input type='radio' name='pet' value='dog' id='dog' /> Dog
            </span>
            <span>
              <input type='radio' name='pet' value='fish' id='fish' /> Fish
            </span>
          </div>
        </label>
      </div>
      <FormElements fields={['name', 'email', 'dog', 'cat', 'fish']} />
    </SuperVizRoomProvider>
  );
}

export default App;
