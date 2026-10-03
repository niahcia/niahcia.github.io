# niahcia.github.io

Static GitHub Pages site for the NIAHCIA project and the `niahcia.com` public landing/download experience.

The site mirrors the current architecture described by the canonical working repository, [niahcia/niahcia](https://github.com/niahcia/niahcia).

## Current architecture reflected here

- CPU Proof-of-Work is the sole chain-consensus authority.
- Native NIAHCIA execution handles balances, transactions, commitments, settlement, and the required smart-contract layer.
- Smart contracts are first-class; `ContractCall` and `ContractCreate` are reserved native actions while the deterministic native runtime remains inactive pending specification/vectors/activation.
- AI inference runs off-chain on replaceable GPU/accelerator workers.
- Wallet-controlled Agents keep private chat history and memory local/encrypted by default.
- Decentralized storage/service providers are optional and never gain fork-choice/finality authority.
- ComputeChannel V2 work remains inactive until its successor block/execution boundary, fees, activation rules, and vectors are complete.

## Status

Pre-alpha / devnet. There is no production network or public binary release yet.

The Downloads page queries GitHub Releases directly and therefore shows “No public release yet” until an actual tagged release exists.

## Source of truth

Architecture and development status should be synchronized from:

- https://github.com/niahcia/niahcia
- https://github.com/niahcia/niahcia/blob/main/ROADMAP.md
- https://github.com/niahcia/niahcia/blob/main/docs/CURRENT-WORK.md
