import MatterportInstance from "./components/MatterportInstance";

function App() {
  // We are initializing multiple rooms for demo purposes.
  return (
    <main>
      <MatterportInstance name="Zeus" />
      <MatterportInstance name="Hera" />
    </main>
  );
}

export default App;
