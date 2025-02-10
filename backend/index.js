import contract from "../artifacts/contracts/HelloWorld.sol/HelloWorld.json" with { type: "json" }
import pkg from 'hardhat';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const { ethers } = pkg
dotenv.config({ path: '../.env' });

const app = express()
app.use(express.json())
app.use(cors())

const port = 3000

const provider = new ethers.providers.JsonRpcProvider(process.env.BASE_URL);
const signer = provider.getSigner();

const helloWorldContract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    contract.abi,
    signer
  )

app.get('/message', async (req, res) => {
    const message = await helloWorldContract.message()
    res.send({message})
})

app.post('/message', async (req, res) => {
    const { message } = req.body;
    if (message === undefined) {
        res.status(400).send("message is required!")
    }
    const tx = await helloWorldContract.update(message)
    await tx.wait()

    const newMessage = await helloWorldContract.message()
    res.send("Edited message to " + newMessage)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})