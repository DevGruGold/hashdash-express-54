import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const projectId = '4c8d51a4170228d9eee7aaa48a124217'

const metadata = {
  name: 'DinerDapp',
  description: 'Web3 Food Delivery Platform',
  url: 'https://dinerdapp.com', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [mainnet], 
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})