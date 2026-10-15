import type {
  BeneficiaryRoute,
  Price,
  SignedTxBase,
  TxBase,
  AccountCreateOperationBody,
  AccountUpdate2OperationBody,
  AccountUpdateOperationBody,
  AccountWitnessProxyOperationBody,
  AccountWitnessVoteOperationBody,
  CancelTransferFromSavingsOperationBody,
  ChangeRecoveryAccountOperationBody,
  ClaimAccountOperationBody,
  ClaimRewardBalanceOperationBody,
  CollateralizedConvertOperationBody,
  CommentOperationBody,
  CommentOptionsOperationBody,
  ConvertOperationBody,
  CreateClaimedAccountOperationBody,
  CreateProposalOperationBody,
  CustomJsonOperationBody,
  DeclineVotingRightsOperationBody,
  DelegateVestingSharesOperationBody,
  DeleteCommentOperationBody,
  EscrowApproveOperationBody,
  EscrowDisputeOperationBody,
  EscrowReleaseOperationBody,
  EscrowTransferOperationBody,
  FeedPublishOperationBody,
  LimitOrderCancelOperationBody,
  LimitOrderCreate2OperationBody,
  LimitOrderCreateOperationBody,
  RecoverAccountOperationBody,
  RecurrentTransferOperationBody,
  RemoveProposalOperationBody,
  RequestAccountRecoveryOperationBody,
  ResetAccountOperationBody,
  SetResetAccountOperationBody,
  SetWithdrawVestingRouteOperationBody,
  TransferFromSavingsOperationBody,
  TransferOperationBody,
  TransferToSavingsOperationBody,
  TransferToVestingOperationBody,
  UpdateProposalOperationBody,
  UpdateProposalVotesOperationBody,
  VoteOperationBody,
  WitnessSetPropertiesOperationBody,
  WitnessUpdateOperationBody,
  WithdrawVestingOperationBody
} from './common.js'

/**
 * Operation name.
 * Ref: https://gitlab.syncad.com/hive/hive/-/blob/master/libraries/protocol/include/hive/protocol/operations.hpp
 */
export type HF26OperationName =
  | 'vote_operation' // 0
  | 'comment_operation' // 1
  | 'transfer_operation' // 2
  | 'transfer_to_vesting_operation' // 3
  | 'withdraw_vesting_operation' // 4
  | 'limit_order_create_operation' // 5
  | 'limit_order_cancel_operation' // 6
  | 'feed_publish_operation' // 7
  | 'convert_operation' // 8
  | 'account_create_operation' // 9
  | 'account_update_operation' // 10
  | 'witness_update_operation' // 11
  | 'account_witness_vote_operation' // 12
  | 'account_witness_proxy_operation' // 13
  | 'pow_operation' // 14
  | 'custom_operation' // 15
  | 'report_over_production_operation' // 16
  | 'delete_comment_operation' // 17
  | 'custom_json_operation' // 18
  | 'comment_options_operation' // 19
  | 'set_withdraw_vesting_route_operation' // 20
  | 'limit_order_create2_operation' // 21
  | 'claim_account_operation' // 22
  | 'create_claimed_account_operation' // 23
  | 'request_account_recovery_operation' // 24
  | 'recover_account_operation' // 25
  | 'change_recovery_account_operation' // 26
  | 'escrow_transfer_operation' // 27
  | 'escrow_dispute_operation' // 28
  | 'escrow_release_operation' // 29
  | 'pow2_operation' // 30
  | 'escrow_approve_operation' // 31
  | 'transfer_to_savings_operation' // 32
  | 'transfer_from_savings_operation' // 33
  | 'cancel_transfer_from_savings_operation' // 34
  | 'custom_binary_operation' // 35
  | 'decline_voting_rights_operation' // 36
  | 'reset_account_operation' // 37
  | 'set_reset_account_operation' // 38
  | 'claim_reward_balance_operation' // 39
  | 'delegate_vesting_shares_operation' // 40
  | 'account_create_with_delegation_operation' // 41
  | 'witness_set_properties_operation' // 42
  | 'account_update2_operation' // 43
  | 'create_proposal_operation' // 44
  | 'update_proposal_votes_operation' // 45
  | 'remove_proposal_operation' // 46
  | 'update_proposal_operation' // 47
  | 'collateralized_convert_operation' // 48
  | 'recurrent_transfer_operation' // 49

export interface Asset {
  amount: string
  precision: number
  nai: '@@000000013' | '@@000000021' | '@@000000037'
}
export type PriceType = Price<Asset>

/**
 * Generic operation.
 */
export interface HF26OperationBase {
  type: HF26OperationName
  value: { [key: string]: any }
}

export type HF26Operation =
  | AccountCreateOperation
  | AccountUpdateOperation
  | AccountWitnessProxyOperation
  | AccountWitnessVoteOperation
  | CancelTransferFromSavingsOperation
  | ChangeRecoveryAccountOperation
  | ClaimRewardBalanceOperation
  | ClaimAccountOperation
  | CommentOperation
  | CommentOptionsOperation
  | ConvertOperation
  | CreateClaimedAccountOperation
  | CustomJsonOperation
  | DeclineVotingRightsOperation
  | DelegateVestingSharesOperation
  | DeleteCommentOperation
  | EscrowApproveOperation
  | EscrowDisputeOperation
  | EscrowReleaseOperation
  | EscrowTransferOperation
  | FeedPublishOperation
  | LimitOrderCancelOperation
  | LimitOrderCreateOperation
  | LimitOrderCreate2Operation
  | RecoverAccountOperation
  | RequestAccountRecoveryOperation
  | ResetAccountOperation
  | SetResetAccountOperation
  | SetWithdrawVestingRouteOperation
  | TransferOperation
  | TransferFromSavingsOperation
  | TransferToSavingsOperation
  | TransferToVestingOperation
  | VoteOperation
  | WithdrawVestingOperation
  | WitnessUpdateOperation
  | WitnessSetPropertiesOperation
  | AccountUpdate2Operation
  | CreateProposalOperation
  | UpdateProposalVotesOperation
  | RemoveProposalOperation
  | UpdateProposalOperation
  | CollateralizedConvertOperation
  | RecurrentTransferOperation

export interface HF26Transaction extends TxBase<HF26Operation> {}
export interface HF26SignedTransaction extends SignedTxBase<HF26Operation> {}

export interface AccountCreateOperation extends HF26OperationBase {
  type: 'account_create_operation'
  value: AccountCreateOperationBody<Asset>
}

/*
export interface AccountCreateWithDelegationOperation extends HF26OperationBase {
  type: 'account_create_with_delegation_operation'
  value: {
    fee: Asset
    delegation: Asset
    creator: string // account_name_type
    new_account_name: string // account_name_type
    owner: AuthorityType
    active: AuthorityType
    posting: AuthorityType
    memo_key: string // public_key_type
    json_metadata: string
    extensions: any[]
  }
}
*/

export interface AccountUpdateOperation extends HF26OperationBase {
  type: 'account_update_operation' // 10
  value: AccountUpdateOperationBody
}

export interface AccountWitnessProxyOperation extends HF26OperationBase {
  type: 'account_witness_proxy_operation' // 13
  value: AccountWitnessProxyOperationBody
}

export interface AccountWitnessVoteOperation extends HF26OperationBase {
  type: 'account_witness_vote_operation' // 12
  value: AccountWitnessVoteOperationBody
}

export interface CancelTransferFromSavingsOperation extends HF26OperationBase {
  type: 'cancel_transfer_from_savings_operation' // 34
  value: CancelTransferFromSavingsOperationBody
}

export interface ChangeRecoveryAccountOperation extends HF26OperationBase {
  type: 'change_recovery_account_operation' // 26
  value: ChangeRecoveryAccountOperationBody
}

export interface ClaimRewardBalanceOperation extends HF26OperationBase {
  type: 'claim_reward_balance_operation' // 39
  value: ClaimRewardBalanceOperationBody<Asset>
}

export interface ClaimAccountOperation extends HF26OperationBase {
  type: 'claim_account_operation' // 22
  value: ClaimAccountOperationBody<Asset>
}

export interface CommentOperation extends HF26OperationBase {
  type: 'comment_operation' // 1
  value: CommentOperationBody
}

export interface CommentOptionsOperation extends HF26OperationBase {
  type: 'comment_options_operation' // 19
  value: CommentOptionsOperationBody<Asset, BeneficiariesExt>
}

interface BeneficiariesExt {
  type: 'comment_payout_beneficiaries'
  value: { beneficiaries: BeneficiaryRoute[] }
}

export interface ConvertOperation extends HF26OperationBase {
  type: 'convert_operation' // 8
  value: ConvertOperationBody<Asset>
}

export interface CreateClaimedAccountOperation extends HF26OperationBase {
  type: 'create_claimed_account_operation' // 23
  value: CreateClaimedAccountOperationBody
}

/*
export interface CustomOperation extends HF26OperationBase {
  type: 'custom' // 15
  value: {
    required_auths: string[]
    id: number // uint16
    data: Buffer | HexBuffer | number[]
  }
}

export interface CustomBinaryOperation extends HF26OperationBase {
  type: 'custom_binary' // 35
  value: {
    required_owner_auths: string[] // flat_set< account_name_type >
    required_active_auths: string[] // flat_set< account_name_type >
    required_posting_auths: string[] // flat_set< account_name_type >
    required_auths: AuthorityType[]
    id: string
    data: Buffer | HexBuffer | number[]
  }
}
*/

export interface CustomJsonOperation extends HF26OperationBase {
  type: 'custom_json_operation' // 18
  value: CustomJsonOperationBody
}

export interface DeclineVotingRightsOperation extends HF26OperationBase {
  type: 'decline_voting_rights_operation' // 36
  value: DeclineVotingRightsOperationBody
}

export interface DelegateVestingSharesOperation extends HF26OperationBase {
  type: 'delegate_vesting_shares_operation' // 40
  value: DelegateVestingSharesOperationBody<Asset>
}

export interface DeleteCommentOperation extends HF26OperationBase {
  type: 'delete_comment_operation' // 17
  value: DeleteCommentOperationBody
}

export interface EscrowApproveOperation extends HF26OperationBase {
  type: 'escrow_approve_operation' // 31
  value: EscrowApproveOperationBody
}

export interface EscrowDisputeOperation extends HF26OperationBase {
  type: 'escrow_dispute_operation' // 28
  value: EscrowDisputeOperationBody
}

export interface EscrowReleaseOperation extends HF26OperationBase {
  type: 'escrow_release_operation' // 29
  value: EscrowReleaseOperationBody<Asset>
}

export interface EscrowTransferOperation extends HF26OperationBase {
  type: 'escrow_transfer_operation' // 27
  value: EscrowTransferOperationBody<Asset>
}

export interface FeedPublishOperation extends HF26OperationBase {
  type: 'feed_publish_operation' // 7
  value: FeedPublishOperationBody<Asset>
}

export interface LimitOrderCancelOperation extends HF26OperationBase {
  type: 'limit_order_cancel_operation' // 6
  value: LimitOrderCancelOperationBody
}

export interface LimitOrderCreateOperation extends HF26OperationBase {
  type: 'limit_order_create_operation' // 5
  value: LimitOrderCreateOperationBody<Asset>
}

export interface LimitOrderCreate2Operation extends HF26OperationBase {
  type: 'limit_order_create2_operation' // 21
  value: LimitOrderCreate2OperationBody<Asset>
}

export interface RecoverAccountOperation extends HF26OperationBase {
  type: 'recover_account_operation' // 25
  value: RecoverAccountOperationBody
}

export interface RequestAccountRecoveryOperation extends HF26OperationBase {
  type: 'request_account_recovery_operation' // 24
  value: RequestAccountRecoveryOperationBody
}

export interface ResetAccountOperation extends HF26OperationBase {
  type: 'reset_account_operation' // 37
  value: ResetAccountOperationBody
}

export interface SetResetAccountOperation extends HF26OperationBase {
  type: 'set_reset_account_operation' // 38
  value: SetResetAccountOperationBody
}

export interface SetWithdrawVestingRouteOperation extends HF26OperationBase {
  type: 'set_withdraw_vesting_route_operation' // 20
  value: SetWithdrawVestingRouteOperationBody
}

export interface TransferOperation extends HF26OperationBase {
  type: 'transfer_operation' // 2
  value: TransferOperationBody<Asset>
}

export interface TransferFromSavingsOperation extends HF26OperationBase {
  type: 'transfer_from_savings_operation' // 33
  value: TransferFromSavingsOperationBody<Asset>
}

export interface TransferToSavingsOperation extends HF26OperationBase {
  type: 'transfer_to_savings_operation' // 32
  value: TransferToSavingsOperationBody<Asset>
}

export interface TransferToVestingOperation extends HF26OperationBase {
  type: 'transfer_to_vesting_operation' // 3
  value: TransferToVestingOperationBody<Asset>
}

export interface VoteOperation extends HF26OperationBase {
  type: 'vote_operation' // 0
  value: VoteOperationBody
}

export interface WithdrawVestingOperation extends HF26OperationBase {
  type: 'withdraw_vesting_operation' // 4
  value: WithdrawVestingOperationBody<Asset>
}

export interface WitnessUpdateOperation extends HF26OperationBase {
  type: 'witness_update_operation' // 11
  value: WitnessUpdateOperationBody<Asset>
}

export interface WitnessSetPropertiesOperation extends HF26OperationBase {
  type: 'witness_set_properties_operation' // 42
  value: WitnessSetPropertiesOperationBody
}

export interface AccountUpdate2Operation extends HF26OperationBase {
  type: 'account_update2_operation' // 43
  value: AccountUpdate2OperationBody
}

export interface CreateProposalOperation extends HF26OperationBase {
  type: 'create_proposal_operation' // 44
  value: CreateProposalOperationBody<Asset>
}

export interface UpdateProposalVotesOperation extends HF26OperationBase {
  type: 'update_proposal_votes_operation' // 45
  value: UpdateProposalVotesOperationBody
}

export interface RemoveProposalOperation extends HF26OperationBase {
  type: 'remove_proposal_operation' // 46
  value: RemoveProposalOperationBody
}

export interface UpdateProposalOperation extends HF26OperationBase {
  type: 'update_proposal_operation' // 47
  value: UpdateProposalOperationBody<Asset>
}

export interface CollateralizedConvertOperation extends HF26OperationBase {
  type: 'collateralized_convert_operation' // 48
  value: CollateralizedConvertOperationBody<Asset>
}

export interface RecurrentTransferOperation extends HF26OperationBase {
  type: 'recurrent_transfer_operation' // 49
  value: RecurrentTransferOperationBody<Asset, RecurrentTransferPairId>
}

export interface RecurrentTransferPairId {
  type: 'recurrent_transfer_pair_id'
  value: {
    pair_id: number
  }
}
