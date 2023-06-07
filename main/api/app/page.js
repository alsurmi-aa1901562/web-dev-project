
export default async function Home() {
  return (
  <body >
    <header>
        <div id="pointer-follow"></div>

        <div className="bg-zinc-200/[0.2] rounded-xl">
          
          <div className="navButton">
            <a>Home</a>
          </div>

          <div className="navButton">
            <a href="login.html" id="login">Login</a>
          </div>

          <div className="navButton">
            <a href="conference-schedule.html" id="login">Conference Schedule</a>
          </div>
          
        </div>
      
    </header>
    <div className="HeaderOfWelcomePage">
            <p>Emerging Technologies Conference</p>
    </div>  
    <main>
      <div className="MainMessage"> 
        <p className="welcomeMessageHeader">
        Welcome to the Emerging Technologies Conference!
        </p>
        <p className="welcomeText">
          We warmly welcome all our esteemed visitors to the Emerging Technologies Conference, where we delve into the world of groundbreaking advancements that are revolutionizing industries and transforming our lives.
          At our conference, we believe in the power of innovation and its profound impact on society. Join us as we bring together visionaries, experts, and enthusiasts to share their knowledge, experiences, and insights. Explore the most promising technologies of our time, forge connections, and shape the future.
          Engage in stimulating conversations, attend captivating speeches, and witness captivating demonstrations. From AI and blockchain to virtual reality and biotechnology, our program covers a diverse range of emerging technologies and their applications.
          Whether you're a professional, student, entrepreneur, or simply curious, join us at the Emerging Technologies Conference. Let's explore innovation, challenge thinking, and unlock the potential of emerging technologies.
          We extend our gratitude to our sponsors, partners, and dedicated team for their support. Their commitment has made this conference possible.
          Find inspiration, make connections, and leave with a renewed sense of possibility. Welcome to the Emerging Technologies Conference, where the future unfolds.
        </p>        
      </div>
    </main>

</body>
  )}
