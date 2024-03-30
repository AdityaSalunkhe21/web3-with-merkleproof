import { Buffer } from "buffer/";
import "./styles/MainMint.scss";
import getProof from "./allowlist";
import getverify from "./demo";
import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import roboPunksNFT from "./RoboPunksNFT.json";
import { Navigate, useNavigate } from "react-router";
window.Buffer = window.Buffer || Buffer;

const roboPunksNFTAddress = "";

export default function MainMint({ accounts, setAccounts }) {

    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    function getwhitelist() {
        window.open("https://www.joinlist.me/pompous-pandas")
    }


    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksNFTAddress,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.0005 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }

    async function handleWhitelistMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(roboPunksNFTAddress, roboPunksNFT.abi, signer);
            const ethAddress = await signer.getAddress();
            const proof = getProof(ethAddress.toString())
            if (getverify(ethAddress)) {
                //alert("✅ User is on the whitelist");
                try {
                    const options = {value: ethers.utils.parseEther((0.0001 * mintAmount).toString())}
                    const response = await contract.whitelistmint(1,proof,options);
                    console.log("Response: ", response);
                } catch(err) {
                    console.error("Error: ", err);
                }
              } else {
                alert("❌ User is not on the whitelist");
                
              }  

            
        }
    }

    function handleDecrement() {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    function handleIncrement() {
        if (mintAmount >= 5) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <section className="mainMint">
            <h1>Pompous Pandas</h1>
            <p>
                Yo, check out Pompous Pandas! Your chance to cop some sick one-of-a-kind Pandas and stunt on your homies. Don't miss out!
            </p>
            {
                isConnected ? (
                    <div>
                        <p className="ps">
                            Yet to Roll out!<br/>
                            If you HODL 0.015Ξ or more in your wallet.<br/>
                            Congratulation! you are eligible for whitelist
                        </p>
                        <button onClick={getwhitelist}>Get Whitelist!</button>
                    </div>
                ) : (
                    <p>You must be connected to mint</p>
                    
                )
            }
            
        </section>
    );
}