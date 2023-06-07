
export default async function Home() {
  let res = await fetch('http://localhost:3000/api/schedule');
  const schedules = await res.json();
  
  let res2 = await fetch(`http://localhost:3000/api/schedule/[${schedules[0].id}]/session`);
  const sessions = res2.json()

  console.log(sessions)
  return (
  <body >
    <header>
        <div id="pointer-follow"></div>
        <div className="bg-zinc-200/[0.2] rounded-xl">
          <div>
            <a>Home</a>
          </div>
          <div>
            <a href="login.html" id="login">Login</a>
          </div>
          <div>
            <a href="conference-schedule.html" id="login">Conference Schedule</a>
          </div>
          
        </div>
      
    </header>
    <div>
            <h1>Emerging Technologies Conference</h1>
    </div>  
    <main>
      <div>
        <h2>
          Welcome To The Emerging Technologies Conference!
        </h2>
        <p>
          This is a conference for emerging technologies. We will be discussing the latest and greatest in the world of technology.
          Any and all conference and their schedules are posted below!
        </p>
        <p>
        "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
        </p>
      </div>
    </main>

</body>
  )
}
