import "./styles/App.scss";
import MainMint from "./MainMint.jsx";
import Navbar from "./Navbar.jsx";
import Backgroundimg from "./assets/background/back7.png";
import p84 from "./assets/background/p84.png";
import p113 from "./assets/background/p113.png";
import p261 from "./assets/background/p261.png";
import low from "./assets/background/preview.png";

import { useState } from "react";

export default function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="container">
      <main className="overlay">
        <section className="App">
          <Navbar accounts={accounts} setAccounts={setAccounts} />
          <MainMint accounts={accounts} setAccounts={setAccounts} />
        </section>
        <div className="movingBackground">
          <img src={Backgroundimg} alt={"back7"} />
        </div>
      </main>
      <section className="details">
        <div className="card">
          <img
            src={p113}
            alt="p113"
          />
          <div className="card-data">
            <h3>PompousPandas FFS!</h3>
            <p>
              Step into the hype of PompousPandas, the dopest NFT collection with 5555 one-of-a-kind digital pandas. As a CC0 project, it's more than just collecting, it's a tight-knit community to join. Get ready to upgrade your NFT game and be a part of the coolest squad in town. Don't miss out on this lit opportunity!
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-data">
            <h3>The Bamboo Garden</h3>
            <p>
              Apart from truely pompous PFP, its more about giving back!
              The Pompous Pandas team is committed to delivering a top-notch NFT experience. In the near future, our roadmap includes implementing a royalty system for our collectors, focusing on first owner royalties through launching a dedicated marketplace, where buyers can easily discover and purchase pandas. And last but not least, we're working on creating an immersive world around our pandas by developing a series of panda comics, bringing their personalities, adventures to life and pushing CC0 limits. Stay tuned for updates on these exciting developments!

            </p>
          </div>
          <img
            src={p84}
            alt="p84"
          />
        </div>

        <div className="card">
          <img
            src={p261}
            alt="p261"
          />
          <div className="card-data">
            <h3>Community, Community and Community!</h3>
            <p>
              PompousPandaNFT is set to revolutionize the community space with its unique blend of collaboration, connection and CC0 values. The community promises to be the most engaging and interactive, fostering a sense of belonging among its members. Its cutting-edge approach to NFTs is poised to set a new standard in the industry, offering the ultimate user experience. Get ready to be part of the next big thing and join the PompousPandaNFT community now!.
              Let's show what happens when we roll out together.
            </p>
          </div>
        </div>
        <div className="bottom-img">
          <h4>

           -------------------------- © •Pomp• --------------------------



          </h4>
        </div>
      </section>
    </div>
  );
}
