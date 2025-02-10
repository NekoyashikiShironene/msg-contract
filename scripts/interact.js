import contract from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json" with { type: "json" }
// console.log(JSON.stringify(contract.abi))

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = provider.getSigner();

const helloWorldContract = new ethers.Contract(
    "0xB7B62b92966C8fb2E960bfD5D19474e2CA965d8b",
    contract.abi,
    signer
  )

async function main() {
    const message = await helloWorldContract.message()
    console.log("The message is: " + message)
  }


async function main2() {
    const message = await helloWorldContract.message()
    console.log("The message is: " + message)
    console.log("Updating the message...")
    const tx = await helloWorldContract.update("This is the new message.")
    await tx.wait()
}
main2()