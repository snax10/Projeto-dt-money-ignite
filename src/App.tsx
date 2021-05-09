import { useState } from 'react';
import Modal from 'react-modal'
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from './components/NewTransactionModal';

import { GlobalStyle } from "./styles/global";

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setisNewTransactionModalOpen] = useState(false);

  function hadleOpenNewTransactionModal() {
    setisNewTransactionModalOpen(true);
  }

  function hadleCloseNewTransactionModal() {
    setisNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={hadleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={hadleCloseNewTransactionModal} />

      <GlobalStyle />
    </>
  );
}

