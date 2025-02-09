import Web3 from "web3";
import Web3Modal, { getInjectedProvider, getInjectedProviderName }
  from "web3modal";
import {WalletLink} from "walletlink";
let web3, web3Provider, web3Account, web3Chain, web3Modal;
web3Account =  null;
import coinbaseWallet from "./assets/images/coinbase-wallet.svg";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { mapGetters } from "vuex";

// const infuraId = "8791e808a8104aa6b2821c82fd3d11ff";
const infuraId = "d20a6707063443e2923d57fe03ac6863";
/* ------ ------ ------	From https://github.com/stewhering/Vue-Web3Modal-Mixin	------ ------ ------ */

export default {
  /* ------ ------ ------	Wallet link (coinbae)	------ ------ ------ */
  data: function(){
    return {
      web3,
      web3Provider,
      web3Account,
      web3Chain,
      Web3ModalOptions: {
        providerOptions: {
          walletconnect: {
            display: {
              name: "Mobile"
            },
            package: WalletConnectProvider,
            options: {
              infuraId: infuraId // required
            }
          },
          "custom-walletlink": {
            display: {
              logo: coinbaseWallet,
              name: "WalletLink",
              description: "Scan with WalletLink to connect",
            },
            options: {
              appName: "AveragePunks", // Your app name
              networkUrl: `https://mainnet.infura.io/v3/${infuraId}`,
              chainId: this.web3Chain,
            },
            package: WalletLink,
            connector: async (_, options) => {
              const { appName, networkUrl, chainId } = options;
              const walletLink = new WalletLink({
                appName
              });
              const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
              await provider.enable();
              return provider;
            },
          },
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      metamaskAddress: "connection/metamaskAddress",
    })
  },
  created: async function() {
    web3Modal = new Web3Modal(this.Web3ModalOptions);
  },
  mounted: async function() {
    // if (this.metamaskAddress) return
    // if(web3Modal.cachedProvider || this.getInjectedWeb3Provider()){
    //     try {
    //         await this.connectWeb3();
    //     } catch(e) {
    //         console.log('Modal closed by user')
    //     }
    // }
  },
  methods: {
    connectWeb3: async function() {
      if (!window.ethereum) {
        return	window.open("https://metamask.io/download", "_blank");
      }

      this.web3Provider = await web3Modal.connect();

      this.web3Provider.on("connect", async (chainId) => {
        this.web3Account = (await this.web3.eth.getAccounts())[0];
        this.web3Chain = chainId;
        this.$emit("Web3Connect");
      });

      this.web3Provider.on("accountsChanged", async (accounts) => {
        this.web3Account = accounts[0];
        this.$emit("Web3AccountChange");
      });

      this.web3Provider.on("chainChanged", async (chainId) => {
        this.web3Account = (await this.web3.eth.getAccounts())[0];
        this.web3Chain = chainId;
        this.$emit("Web3ChainChange");
      });

      this.web3Provider.on("disconnect", async () => {
        this.web3Account = undefined;
        this.web3Chain = undefined;
        this.$emit("Web3Disconnect");
      });

      this.web3 = new Web3(this.web3Provider);

      this.web3Account = (await this.web3.eth.getAccounts())[0];
      this.web3Chain = await this.web3.eth.getChainId();

      this.web3.eth.subscribe("newBlockHeaders", () => {
        this.$emit(`Web3NewChainBlock`);
      });

      this.$emit("Web3Connect");
    },
    connectWeb3To: async function(id) {
      this.web3Provider = await web3Modal.connectTo(id);

      this.web3Provider.on("connect", async (chainId) => {
        this.web3Account = (await this.web3.eth.getAccounts())[0];
        this.web3Chain = chainId;
        this.$emit("Web3Connect");
      });

      this.web3Provider.on("accountsChanged", async (accounts) => {
        this.web3Account = accounts[0];
        this.$emit("Web3AccountChange");
      });

      this.web3Provider.on("chainChanged", async (chainId) => {
        this.web3Account = (await this.web3.eth.getAccounts())[0];
        this.web3Chain = chainId;
        this.$emit("Web3ChainChange");
      });

      this.web3Provider.on("disconnect", async () => {
        this.web3Account = undefined;
        this.web3Chain = undefined;
        this.$emit("Web3Disconnect");
      });

      this.web3 = new Web3(this.web3Provider);

      this.web3Account = (await this.web3.eth.getAccounts())[0];
      this.web3Chain = await this.web3.eth.getChainId();

      this.web3.eth.subscribe("newBlockHeaders", () => {
        this.$emit(`Web3NewChainBlock`);
      });

      this.$emit("Web3Connect");
    },
    disconnectWeb3: async function() {
      if(this.web3Provider && typeof this.web3Provider.disconnect === "function"){
        await this.web3Provider.disconnect();
      }

      web3Modal.clearCachedProvider();

      if (this.web3 !== undefined && this.web3.eth !== undefined)
        this.web3.eth.clearSubscriptions();

      this.web3Account  = undefined;
      this.web3Chain = undefined;
      this.web3Provider = undefined;
      this.web3 = undefined;

      this.$emit("Web3Disconnect");
    },
    cacheWeb3Provider: function() {
      web3Modal.setCachedProvider();
    },
    clearWeb3Provider: function() {
      web3Modal.clearCachedProvider();
    },
    getInjectedWeb3Provider: function() {
      return getInjectedProvider();
    },
    getInjectedWeb3ProviderName: function() {
      return getInjectedProviderName();
    }
  },
};
