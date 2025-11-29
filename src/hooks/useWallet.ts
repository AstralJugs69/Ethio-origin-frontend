import { useState } from 'react';
import { Wallet } from '../types/cardano';

export function useWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async (walletName: string) => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockWallet: Wallet = {
        address: `addr_test1q${Math.random().toString(36).substr(2, 32)}`,
        name: walletName,
        isConnected: true
      };
      
      setWallet(mockWallet);
      return mockWallet;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
  };

  const sendTip = async (amount: number, toAddress: string) => {
    // Simulate sending tip
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(`Sent ${amount} ADA to ${toAddress}`);
    return { success: true, txHash: `tx_${Math.random().toString(36).substr(2, 16)}` };
  };

  return {
    wallet,
    isConnecting,
    connectWallet,
    disconnectWallet,
    sendTip
  };
}