import "./styles/Navbar.scss";
import Facebook from "./assets/social-media-icons/facebook.png";
import Twitter from "./assets/social-media-icons/twitter.png";
import Email from "./assets/social-media-icons/email.png";


export default function Navbar({ accounts, setAccounts }) {

    const isConnected = Boolean(accounts[0]);
    const chainId = '0x1';
    
    //const acc = window.ethereum.request({ method: "eth_requestAccounts" });

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            await switchNetwork(currentChainId);
            setAccounts(accounts);
            console.log(accounts);
            
        
        } else {
            window.alert("Please install metamask to use this website");
        }
    }

    async function switchNetwork(currentChainId) {
        
        if (currentChainId !== chainId){
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: chainId}]
                });
                
                
            } catch (switchError) {
                console.log("Network in not present!")
            }
        }
        
    } 

    return (
        <header className="header">
            <section className="iconContainer">
                <a href="https://discord.gg/P4e6rpJype" target="_blank" rel="noreferrer" >
                    <img src={Facebook} alt="facebook" />
                </a>

                <a href="https://twitter.com/PompousNFT" target="_blank" rel="noreferrer" >
                    <img src={Twitter} alt="twitter" />
                </a>

                <a href="https://www.opensea.io" target="_blank" rel="noreferrer" >
                    <img src={Email} alt="email" />
                </a>

                
            </section>

            <section className="navigation">
                

                {
                    isConnected ? ( <p>Connected</p> ) : ( <button onClick={connectAccount}>Connect</button> )
                }
            </section>
        </header>
    );
}

