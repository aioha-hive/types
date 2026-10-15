export interface AuthorityType {
  weight_threshold: number // uint32_t
  account_auths: [string, number][] // flat_map< account_name_type, uint16_t >
  key_auths: [string, number][] // flat_map< public_key_type, uint16_t >
}

export type Price<T> = { base: T; quote: T }

export interface BeneficiaryRoute {
  account: string // account_name_type
  weight: number // uint16_t
}

/**
 * Chain roperties that are decided by the witnesses.
 */
export interface ChainProperties<T> {
  /**
   * This fee, paid in HIVE, is converted into VESTING SHARES for the new account. Accounts
   * without vesting shares cannot earn usage rations and therefore are powerless. This minimum
   * fee requires all accounts to have some kind of commitment to the network that includes the
   * ability to vote and make transactions.
   *
   * @note This has to be multiplied by STEEMIT ? `CREATE_ACCOUNT_WITH_HIVE_MODIFIER`
   *       (defined as 30 on the main chain) to get the minimum fee needed to create an account.
   *
   */
  account_creation_fee: T
  /**
   * This witnesses vote for the maximum_block_size which is used by the network
   * to tune rate limiting and capacity.
   */
  maximum_block_size: number // uint32_t
  /**
   * The HBD interest percentage rate decided by witnesses, expressed 0 to 10000.
   */
  hbd_interest_rate: number // uint16_t
}

/*
 * Operation bodies shared between the legacy (tuple) and HF26 ({ type, value })
 * operation formats. Bodies carrying asset fields are generic over the asset type,
 * and bodies whose extensions carry a format-specific typed payload take an
 * optional extension type parameter.
 */

export type AccountCreateOperationBody<AssetT> = {
  fee: AssetT
  creator: string // account_name_type
  new_account_name: string // account_name_type
  owner: AuthorityType
  active: AuthorityType
  posting: AuthorityType
  memo_key: string // public_key_type
  json_metadata: string
}

export type AccountUpdateOperationBody = {
  account: string // account_name_type
  owner?: AuthorityType // optional< authority >
  active?: AuthorityType // optional< authority >
  posting?: AuthorityType // optional< authority >
  memo_key: string // public_key_type
  json_metadata: string
}

export type AccountWitnessProxyOperationBody = {
  account: string // account_name_type
  proxy: string // account_name_type
}

export type AccountWitnessVoteOperationBody = {
  account: string // account_name_type
  witness: string // account_name_type
  approve: boolean
}

export type CancelTransferFromSavingsOperationBody = {
  from: string // account_name_type
  request_id: number // uint32_t
}

/**
 * Each account lists another account as their recovery account.
 * The recovery account has the ability to create account_recovery_requests
 * for the account to recover. An account can change their recovery account
 * at any time with a 30 day delay. This delay is to prevent
 * an attacker from changing the recovery account to a malicious account
 * during an attack. These 30 days match the 30 days that an
 * owner authority is valid for recovery purposes.
 *
 * On account creation the recovery account is set either to the creator of
 * the account (The account that pays the creation fee and is a signer on the transaction)
 * or to the empty string if the account was mined. An account with no recovery
 * has the top voted witness as a recovery account, at the time the recover
 * request is created. Note: This does mean the effective recovery account
 * of an account with no listed recovery account can change at any time as
 * witness vote weights. The top voted witness is explicitly the most trusted
 * witness according to stake.
 */
export type ChangeRecoveryAccountOperationBody = {
  /**
   * The account that would be recovered in case of compromise.
   */
  account_to_recover: string // account_name_type
  /**
   * The account that creates the recover request.
   */
  new_recovery_account: string // account_name_type
  /**
   * Extensions. Not currently used.
   */
  extensions: any[] // extensions_type
}

export type ClaimRewardBalanceOperationBody<AssetT> = {
  account: string // account_name_type
  reward_hive: AssetT
  reward_hbd: AssetT
  reward_vests: AssetT
}

export type ClaimAccountOperationBody<AssetT> = {
  creator: string // account_name_type
  fee: AssetT
  /**
   * Extensions. Not currently used.
   */
  extensions: any[] // extensions_type
}

export type CommentOperationBody = {
  parent_author: string // account_name_type
  parent_permlink: string
  author: string // account_name_type
  permlink: string
  title: string
  body: string
  json_metadata: string
}

export type CommentOptionsOperationBody<AssetT, ExtT = any> = {
  author: string // account_name_type
  permlink: string
  /** HBD value of the maximum payout this post will receive. */
  max_accepted_payout: AssetT
  /** The percent of Hive Dollars to key, unkept amounts will be received as Hive Power. */
  percent_hbd: number // uint16_t
  /** Whether to allow post to receive votes. */
  allow_votes: boolean
  /** Whether to allow post to recieve curation rewards. */
  allow_curation_rewards: boolean
  extensions: ExtT[] // flat_set< comment_options_extension >
}

export type ConvertOperationBody<AssetT> = {
  owner: string // account_name_type
  requestid: number // uint32_t
  amount: AssetT
}

export type CreateClaimedAccountOperationBody = {
  creator: string // account_name_type
  new_account_name: string // account_name_type
  owner: AuthorityType
  active: AuthorityType
  posting: AuthorityType
  memo_key: string // public_key_type
  json_metadata: string
  /**
   * Extensions. Not currently used.
   */
  extensions: any[] // extensions_type
}

export type CustomJsonOperationBody = {
  required_auths: string[] // flat_set< account_name_type >
  required_posting_auths: string[] // flat_set< account_name_type >
  /**
   * ID string, must be less than 32 characters long.
   */
  id: string
  /**
   * JSON encoded string, must be valid JSON.
   */
  json: string
}

export type DeclineVotingRightsOperationBody = {
  account: string // account_name_type
  decline: boolean
}

export type DelegateVestingSharesOperationBody<AssetT> = {
  /**
   * The account delegating vesting shares.
   */
  delegator: string // account_name_type
  /**
   * The account receiving vesting shares.
   */
  delegatee: string // account_name_type
  /**
   * The amount of vesting shares delegated.
   */
  vesting_shares: AssetT
}

export type DeleteCommentOperationBody = {
  author: string // account_name_type
  permlink: string
}

/**
 * The agent and to accounts must approve an escrow transaction for it to be valid on
 * the blockchain. Once a part approves the escrow, the cannot revoke their approval.
 * Subsequent escrow approve operations, regardless of the approval, will be rejected.
 */
export type EscrowApproveOperationBody = {
  from: string // account_name_type
  to: string // account_name_type
  agent: string // account_name_type
  /**
   * Either to or agent.
   */
  who: string // account_name_type
  escrow_id: number // uint32_t
  approve: boolean
}

/**
 * If either the sender or receiver of an escrow payment has an issue, they can
 * raise it for dispute. Once a payment is in dispute, the agent has authority over
 * who gets what.
 */
export type EscrowDisputeOperationBody = {
  from: string // account_name_type
  to: string // account_name_type
  agent: string // account_name_type
  who: string // account_name_type
  escrow_id: number // uint32_t
}

/**
 * This operation can be used by anyone associated with the escrow transfer to
 * release funds if they have permission.
 *
 * The permission scheme is as follows:
 * If there is no dispute and escrow has not expired, either party can release funds to the other.
 * If escrow expires and there is no dispute, either party can release funds to either party.
 * If there is a dispute regardless of expiration, the agent can release funds to either party
 *    following whichever agreement was in place between the parties.
 */
export type EscrowReleaseOperationBody<AssetT> = {
  from: string // account_name_type
  /**
   * The original 'to'.
   */
  to: string // account_name_type
  agent: string // account_name_type
  /**
   * The account that is attempting to release the funds, determines valid 'receiver'.
   */
  who: string // account_name_type
  /**
   * The account that should receive funds (might be from, might be to).
   */
  receiver: string // account_name_type
  escrow_id: number // uint32_t
  /**
   * The amount of hbd to release.
   */
  hbd_amount: AssetT
  /**
   * The amount of hive to release.
   */
  hive_amount: AssetT
}

/**
 * The purpose of this operation is to enable someone to send money contingently to
 * another individual. The funds leave the *from* account and go into a temporary balance
 * where they are held until *from* releases it to *to* or *to* refunds it to *from*.
 *
 * In the event of a dispute the *agent* can divide the funds between the to/from account.
 * Disputes can be raised any time before or on the dispute deadline time, after the escrow
 * has been approved by all parties.
 *
 * This operation only creates a proposed escrow transfer. Both the *agent* and *to* must
 * agree to the terms of the arrangement by approving the escrow.
 *
 * The escrow agent is paid the fee on approval of all parties. It is up to the escrow agent
 * to determine the fee.
 *
 * Escrow transactions are uniquely identified by 'from' and 'escrow_id', the 'escrow_id' is defined
 * by the sender.
 */
export type EscrowTransferOperationBody<AssetT> = {
  from: string // account_name_type
  to: string // account_name_type
  agent: string // account_name_type
  escrow_id: number // uint32_t
  hbd_amount: AssetT
  hive_amount: AssetT
  fee: AssetT
  ratification_deadline: string // time_point_sec
  escrow_expiration: string // time_point_sec
  json_meta: string
}

export type FeedPublishOperationBody<AssetT> = {
  publisher: string // account_name_type
  exchange_rate: Price<AssetT>
}

/**
 * Cancels an order and returns the balance to owner.
 */
export type LimitOrderCancelOperationBody = {
  owner: string // account_name_type
  orderid: number // uint32_t
}

/**
 * This operation creates a limit order and matches it against existing open orders.
 */
export type LimitOrderCreateOperationBody<AssetT> = {
  owner: string // account_name_type
  orderid: number // uint32_t
  amount_to_sell: AssetT
  min_to_receive: AssetT
  fill_or_kill: boolean
  expiration: string // time_point_sec
}

/**
 * This operation is identical to limit_order_create except it serializes the price rather
 * than calculating it from other fields.
 */
export type LimitOrderCreate2OperationBody<AssetT> = {
  owner: string // account_name_type
  orderid: number // uint32_t
  amount_to_sell: AssetT
  exchange_rate: Price<AssetT>
  fill_or_kill: boolean
  expiration: string // time_point_sec
}

/**
 * Recover an account to a new authority using a previous authority and verification
 * of the recovery account as proof of identity. This operation can only succeed
 * if there was a recovery request sent by the account's recover account.
 *
 * In order to recover the account, the account holder must provide proof
 * of past ownership and proof of identity to the recovery account. Being able
 * to satisfy an owner authority that was used in the past 30 days is sufficient
 * to prove past ownership. The get_owner_history function in the database API
 * returns past owner authorities that are valid for account recovery.
 *
 * Proving identity is an off chain contract between the account holder and
 * the recovery account. The recovery request contains a new authority which
 * must be satisfied by the account holder to regain control. The actual process
 * of verifying authority may become complicated, but that is an application
 * level concern, not a blockchain concern.
 *
 * This operation requires both the past and future owner authorities in the
 * operation because neither of them can be derived from the current chain state.
 * The operation must be signed by keys that satisfy both the new owner authority
 * and the recent owner authority. Failing either fails the operation entirely.
 *
 * If a recovery request was made inadvertantly, the account holder should
 * contact the recovery account to have the request deleted.
 *
 * The two setp combination of the account recovery request and recover is
 * safe because the recovery account never has access to secrets of the account
 * to recover. They simply act as an on chain endorsement of off chain identity.
 * In other systems, a fork would be required to enforce such off chain state.
 * Additionally, an account cannot be permanently recovered to the wrong account.
 * While any owner authority from the past 30 days can be used, including a compromised
 * authority, the account can be continually recovered until the recovery account
 * is confident a combination of uncompromised authorities were used to
 * recover the account. The actual process of verifying authority may become
 * complicated, but that is an application level concern, not the blockchain's
 * concern.
 */
export type RecoverAccountOperationBody = {
  /**
   * The account to be recovered.
   */
  account_to_recover: string // account_name_type
  /**
   * The new owner authority as specified in the request account recovery operation.
   */
  new_owner_authority: AuthorityType
  /**
   * A previous owner authority that the account holder will use to prove
   * past ownership of the account to be recovered.
   */
  recent_owner_authority: AuthorityType
  /**
   * Extensions. Not currently used.
   */
  extensions: any[] // extensions_type
}

/**
 * All account recovery requests come from a listed recovery account. This
 * is secure based on the assumption that only a trusted account should be
 * a recovery account. It is the responsibility of the recovery account to
 * verify the identity of the account holder of the account to recover by
 * whichever means they have agreed upon. The blockchain assumes identity
 * has been verified when this operation is broadcast.
 *
 * This operation creates an account recovery request which the account to
 * recover has 24 hours to respond to before the request expires and is
 * invalidated.
 *
 * There can only be one active recovery request per account at any one time.
 * Pushing this operation for an account to recover when it already has
 * an active request will either update the request to a new new owner authority
 * and extend the request expiration to 24 hours from the current head block
 * time or it will delete the request. To cancel a request, simply set the
 * weight threshold of the new owner authority to 0, making it an open authority.
 *
 * Additionally, the new owner authority must be satisfiable. In other words,
 * the sum of the key weights must be greater than or equal to the weight
 * threshold.
 *
 * This operation only needs to be signed by the the recovery account.
 * The account to recover confirms its identity to the blockchain in
 * the recover account operation.
 */
export type RequestAccountRecoveryOperationBody = {
  /**
   * The recovery account is listed as the recovery account on the account to recover.
   */
  recovery_account: string // account_name_type
  /**
   * The account to recover. This is likely due to a compromised owner authority.
   */
  account_to_recover: string // account_name_type
  /**
   * The new owner authority the account to recover wishes to have. This is secret
   * known by the account to recover and will be confirmed in a recover_account_operation.
   */
  new_owner_authority: AuthorityType
  /**
   * Extensions. Not currently used.
   */
  extensions: any[] // extensions_type
}

/**
 * This operation allows recovery_account to change account_to_reset's owner authority to
 * new_owner_authority after 60 days of inactivity.
 */
export type ResetAccountOperationBody = {
  reset_account: string // account_name_type
  account_to_reset: string // account_name_type
  new_owner_authority: AuthorityType
}

/**
 * This operation allows 'account' owner to control which account has the power
 * to execute the 'reset_account_operation' after 60 days.
 */
export type SetResetAccountOperationBody = {
  account: string // account_name_type
  current_reset_account: string // account_name_type
  reset_account: string // account_name_type
}

/**
 * Allows an account to setup a vesting withdraw but with the additional
 * request for the funds to be transferred directly to another account's
 * balance rather than the withdrawing account. In addition, those funds
 * can be immediately vested again, circumventing the conversion from
 * vests to hive and back, guaranteeing they maintain their value.
 */
export type SetWithdrawVestingRouteOperationBody = {
  from_account: string // account_name_type
  to_account: string // account_name_type
  percent: number // uint16_t (100% = 100_PERCENT = 10000)
  auto_vest: boolean
}

/**
 * Transfers asset from one account to another.
 */
export type TransferOperationBody<AssetT> = {
  /**
   * Sending account name.
   */
  from: string // account_name_type
  /**
   * Receiving account name.
   */
  to: string // account_name_type
  /**
   * Amount of HIVE or HBD to send.
   */
  amount: AssetT
  /**
   * Plain-text note attached to transaction.
   */
  memo: string
}

export type TransferFromSavingsOperationBody<AssetT> = {
  from: string // account_name_type
  request_id: number // uint32_t
  to: string // account_name_type
  amount: AssetT
  memo: string
}

export type TransferToSavingsOperationBody<AssetT> = {
  amount: AssetT
  from: string // account_name_type
  memo: string
  request_id: number // uint32_t
  to: string // account_name_type
}

/**
 * This operation converts HIVE into VFS (Vesting Fund Shares) at
 * the current exchange rate. With this operation it is possible to
 * give another account vesting shares so that faucets can
 * pre-fund new accounts with vesting shares.
 * (A.k.a. Powering Up)
 */
export type TransferToVestingOperationBody<AssetT> = {
  from: string // account_name_type
  to: string // account_name_type
  /**
   * Amount to power up, must be HIVE
   */
  amount: AssetT
}

export type VoteOperationBody = {
  voter: string // account_name_type
  author: string // account_name_type
  permlink: string
  /**
   * Voting weight, 100% = 10000 (100_PERCENT).
   */
  weight: number // int16_t
}

/**
 * At any given point in time an account can be withdrawing from their
 * vesting shares. A user may change the number of shares they wish to
 * cash out at any time between 0 and their total vesting stake.
 *
 * After applying this operation, vesting_shares will be withdrawn
 * at a rate of vesting_shares/104 per week for two years starting
 * one week after this operation is included in the blockchain.
 *
 * This operation is not valid if the user has no vesting shares.
 * (A.k.a. Powering Down)
 */
export type WithdrawVestingOperationBody<AssetT> = {
  account: string // account_name_type
  /**
   * Amount to power down, must be VESTS.
   */
  vesting_shares: AssetT
}

/**
 * Users who wish to become a witness must pay a fee acceptable to
 * the current witnesses to apply for the position and allow voting
 * to begin.
 *
 * If the owner isn't a witness they will become a witness.  Witnesses
 * are charged a fee equal to 1 weeks worth of witness pay which in
 * turn is derived from the current share supply.  The fee is
 * only applied if the owner is not already a witness.
 *
 * If the block_signing_key is null then the witness is removed from
 * contention.  The network will pick the top 21 witnesses for
 * producing blocks.
 */
export type WitnessUpdateOperationBody<AssetT> = {
  owner: string // account_name_type
  /**
   * URL for witness, usually a link to a post in the witness-category tag.
   */
  url: string
  block_signing_key: string | null // public_key_type
  props: ChainProperties<AssetT>
  /**
   * The fee paid to register a new witness, should be 10x current block production pay.
   */
  fee: AssetT
}

export type WitnessSetPropertiesOperationBody = {
  owner: string
  props: [string, string][]
  extensions: any[]
}

export type AccountUpdate2OperationBody = {
  account: string // account_name_type
  owner?: AuthorityType // optional< authority >
  active?: AuthorityType // optional< authority >
  posting?: AuthorityType // optional< authority >
  memo_key?: string // public_key_type
  json_metadata: string
  posting_json_metadata: string
  extensions: any[]
}

export type CreateProposalOperationBody<AssetT> = {
  creator: string
  receiver: string
  start_date: string // time_point_sec
  end_date: string // time_point_sec
  daily_pay: AssetT
  subject: string
  permlink: string
  extensions: any[]
}

export type UpdateProposalVotesOperationBody = {
  voter: string
  proposal_ids: number[] // flat_set_ex<int64_t>
  approve: boolean
  extensions: any[]
}

export type RemoveProposalOperationBody = {
  proposal_owner: string
  proposal_ids: number[] // flat_set_ex<int64_t>
  extensions: any[]
}

export type UpdateProposalOperationBody<AssetT> = {
  proposal_id: number
  creator: string
  daily_pay: AssetT
  subject: string
  permlink: string
  extensions: any[]
}

export type CollateralizedConvertOperationBody<AssetT> = {
  owner: string
  requestid: number
  amount: AssetT
}

export type RecurrentTransferOperationBody<AssetT, ExtT = any> = {
  from: string
  to: string
  amount: AssetT
  memo: string
  recurrence: number
  executions: number
  extensions: ExtT[]
}

export interface TxBase<T> {
  ref_block_num: number
  ref_block_prefix: number
  expiration: string
  operations: T[]
  extensions: any[]
}

export interface SignedTxBase<T> extends TxBase<T> {
  signatures: string[]
}
