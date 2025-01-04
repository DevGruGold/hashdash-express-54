import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const projectId = '5334a348caf024865954a0ac808d4e0b'

const metadata = {
  name: 'HashDash',
  description: 'Web3 Food Delivery Platform',
  url: 'https://hashdash.com', 
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