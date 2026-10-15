/**
 * Compile-time compatibility tests between `@aioha/types` and `@hiveio/dhive`
 * for the legacy (pre-HF26, tuple) operation format.
 *
 * The two type families must be interchangeable in both directions:
 * - every legacy transaction/operation is accepted where dhive expects its own
 *   (e.g. `Client.broadcast`, `cryptoUtils.signTransaction`), and
 * - every dhive transaction (as returned by dhive signing APIs or
 *   `@aioha/ledger-app-hive`) is accepted where the legacy types are expected.
 *
 * There is no test runner: `pnpm test` type-checks this file with `tsc`, so
 * a failed assertion is a compile error.
 */
import type * as dhive from '@hiveio/dhive'
import type {
  AccountCreateOperation,
  AccountUpdate2Operation,
  AccountUpdateOperation,
  AccountWitnessProxyOperation,
  AccountWitnessVoteOperation,
  CancelTransferFromSavingsOperation,
  ChangeRecoveryAccountOperation,
  ClaimAccountOperation,
  ClaimRewardBalanceOperation,
  CollateralizedConvertOperation,
  CommentOperation,
  CommentOptionsOperation,
  ConvertOperation,
  CreateClaimedAccountOperation,
  CreateProposalOperation,
  CustomJsonOperation,
  DeclineVotingRightsOperation,
  DelegateVestingSharesOperation,
  DeleteCommentOperation,
  EscrowApproveOperation,
  EscrowDisputeOperation,
  EscrowReleaseOperation,
  EscrowTransferOperation,
  FeedPublishOperation,
  LegacyAsset,
  LegacyOperation,
  LegacyOperationBase,
  LegacyOperationName,
  LegacySignedTransaction,
  LegacyTransaction,
  LegacyVirtualOperationName,
  LimitOrderCancelOperation,
  LimitOrderCreate2Operation,
  LimitOrderCreateOperation,
  RecoverAccountOperation,
  RecurrentTransferOperation,
  RemoveProposalOperation,
  RequestAccountRecoveryOperation,
  ResetAccountOperation,
  SetResetAccountOperation,
  SetWithdrawVestingRouteOperation,
  TransferFromSavingsOperation,
  TransferOperation,
  TransferToSavingsOperation,
  TransferToVestingOperation,
  UpdateProposalOperation,
  UpdateProposalVotesOperation,
  VoteOperation,
  WitnessSetPropertiesOperation,
  WitnessUpdateOperation,
  WithdrawVestingOperation
} from '../src/hive/legacy.js'

// ---------------------------------------------------------------------------
// Transactions (legacy -> dhive)
// ---------------------------------------------------------------------------

/** A legacy transaction is accepted wherever dhive expects its own. */
declare const legacyTransaction: LegacyTransaction
const asDhiveTransaction: dhive.Transaction = legacyTransaction

/** A legacy signed transaction is accepted wherever dhive expects its own. */
declare const legacySignedTransaction: LegacySignedTransaction
const asDhiveSignedTransaction: dhive.SignedTransaction = legacySignedTransaction

/** A legacy operation array is accepted by broadcasting APIs (`Operation[]`). */
declare const legacyOperations: LegacyOperation[]
const asDhiveOperations: dhive.Operation[] = legacyOperations

// ---------------------------------------------------------------------------
// Operations (legacy -> dhive, one per legacy operation interface)
// ---------------------------------------------------------------------------

declare const accountCreate: AccountCreateOperation
const asDhiveAccountCreate: dhive.AccountCreateOperation = accountCreate

declare const accountUpdate: AccountUpdateOperation
const asDhiveAccountUpdate: dhive.AccountUpdateOperation = accountUpdate

declare const accountUpdate2: AccountUpdate2Operation
const asDhiveAccountUpdate2: dhive.AccountUpdate2Operation = accountUpdate2

declare const accountWitnessProxy: AccountWitnessProxyOperation
const asDhiveAccountWitnessProxy: dhive.AccountWitnessProxyOperation = accountWitnessProxy

declare const accountWitnessVote: AccountWitnessVoteOperation
const asDhiveAccountWitnessVote: dhive.AccountWitnessVoteOperation = accountWitnessVote

declare const cancelTransferFromSavings: CancelTransferFromSavingsOperation
const asDhiveCancelTransferFromSavings: dhive.CancelTransferFromSavingsOperation =
  cancelTransferFromSavings

declare const changeRecoveryAccount: ChangeRecoveryAccountOperation
const asDhiveChangeRecoveryAccount: dhive.ChangeRecoveryAccountOperation = changeRecoveryAccount

declare const claimAccount: ClaimAccountOperation
const asDhiveClaimAccount: dhive.ClaimAccountOperation = claimAccount

declare const claimRewardBalance: ClaimRewardBalanceOperation
const asDhiveClaimRewardBalance: dhive.ClaimRewardBalanceOperation = claimRewardBalance

declare const collateralizedConvert: CollateralizedConvertOperation
const asDhiveCollateralizedConvert: dhive.CollateralizedConvertOperation = collateralizedConvert

declare const comment: CommentOperation
const asDhiveComment: dhive.CommentOperation = comment

declare const commentOptions: CommentOptionsOperation
const asDhiveCommentOptions: dhive.CommentOptionsOperation = commentOptions

/** The comment_options beneficiaries extension must be the exact dhive tuple. */
const commentOptionsExtensions: [0, { beneficiaries: dhive.BeneficiaryRoute[] }][] =
  commentOptions[1].extensions

declare const convert: ConvertOperation
const asDhiveConvert: dhive.ConvertOperation = convert

declare const createClaimedAccount: CreateClaimedAccountOperation
const asDhiveCreateClaimedAccount: dhive.CreateClaimedAccountOperation = createClaimedAccount

declare const createProposal: CreateProposalOperation
const asDhiveCreateProposal: dhive.CreateProposalOperation = createProposal

declare const customJson: CustomJsonOperation
const asDhiveCustomJson: dhive.CustomJsonOperation = customJson

declare const declineVotingRights: DeclineVotingRightsOperation
const asDhiveDeclineVotingRights: dhive.DeclineVotingRightsOperation = declineVotingRights

declare const delegateVestingShares: DelegateVestingSharesOperation
const asDhiveDelegateVestingShares: dhive.DelegateVestingSharesOperation = delegateVestingShares

declare const deleteComment: DeleteCommentOperation
const asDhiveDeleteComment: dhive.DeleteCommentOperation = deleteComment

declare const escrowApprove: EscrowApproveOperation
const asDhiveEscrowApprove: dhive.EscrowApproveOperation = escrowApprove

declare const escrowDispute: EscrowDisputeOperation
const asDhiveEscrowDispute: dhive.EscrowDisputeOperation = escrowDispute

declare const escrowRelease: EscrowReleaseOperation
const asDhiveEscrowRelease: dhive.EscrowReleaseOperation = escrowRelease

declare const escrowTransfer: EscrowTransferOperation
const asDhiveEscrowTransfer: dhive.EscrowTransferOperation = escrowTransfer

declare const feedPublish: FeedPublishOperation
const asDhiveFeedPublish: dhive.FeedPublishOperation = feedPublish

declare const limitOrderCancel: LimitOrderCancelOperation
const asDhiveLimitOrderCancel: dhive.LimitOrderCancelOperation = limitOrderCancel

declare const limitOrderCreate: LimitOrderCreateOperation
const asDhiveLimitOrderCreate: dhive.LimitOrderCreateOperation = limitOrderCreate

declare const limitOrderCreate2: LimitOrderCreate2Operation
const asDhiveLimitOrderCreate2: dhive.LimitOrderCreate2Operation = limitOrderCreate2

declare const recoverAccount: RecoverAccountOperation
const asDhiveRecoverAccount: dhive.RecoverAccountOperation = recoverAccount

declare const recurrentTransfer: RecurrentTransferOperation
const asDhiveRecurrentTransfer: dhive.RecurrentTransferOperation = recurrentTransfer

declare const removeProposal: RemoveProposalOperation
const asDhiveRemoveProposal: dhive.RemoveProposalOperation = removeProposal

declare const requestAccountRecovery: RequestAccountRecoveryOperation
const asDhiveRequestAccountRecovery: dhive.RequestAccountRecoveryOperation = requestAccountRecovery

declare const resetAccount: ResetAccountOperation
const asDhiveResetAccount: dhive.ResetAccountOperation = resetAccount

declare const setResetAccount: SetResetAccountOperation
const asDhiveSetResetAccount: dhive.SetResetAccountOperation = setResetAccount

declare const setWithdrawVestingRoute: SetWithdrawVestingRouteOperation
const asDhiveSetWithdrawVestingRoute: dhive.SetWithdrawVestingRouteOperation =
  setWithdrawVestingRoute

declare const transfer: TransferOperation
const asDhiveTransfer: dhive.TransferOperation = transfer

declare const transferFromSavings: TransferFromSavingsOperation
const asDhiveTransferFromSavings: dhive.TransferFromSavingsOperation = transferFromSavings

declare const transferToSavings: TransferToSavingsOperation
const asDhiveTransferToSavings: dhive.TransferToSavingsOperation = transferToSavings

declare const transferToVesting: TransferToVestingOperation
const asDhiveTransferToVesting: dhive.TransferToVestingOperation = transferToVesting

declare const updateProposal: UpdateProposalOperation
const asDhiveUpdateProposal: dhive.UpdateProposalOperation = updateProposal

declare const updateProposalVotes: UpdateProposalVotesOperation
const asDhiveUpdateProposalVotes: dhive.UpdateProposalVotesOperation = updateProposalVotes

declare const vote: VoteOperation
const asDhiveVote: dhive.VoteOperation = vote

declare const witnessSetProperties: WitnessSetPropertiesOperation
const asDhiveWitnessSetProperties: dhive.WitnessSetPropertiesOperation = witnessSetProperties

declare const witnessUpdate: WitnessUpdateOperation
const asDhiveWitnessUpdate: dhive.WitnessUpdateOperation = witnessUpdate

declare const withdrawVesting: WithdrawVestingOperation
const asDhiveWithdrawVesting: dhive.WithdrawVestingOperation = withdrawVesting

// ---------------------------------------------------------------------------
// Object literals
// ---------------------------------------------------------------------------

/**
 * A hand-built legacy transaction (vote + comment options with beneficiaries +
 * transfer) must be accepted by any dhive API.
 */
const legacyTransactionLiteral: LegacyTransaction = {
  ref_block_num: 12345,
  ref_block_prefix: 678901234,
  expiration: '2026-01-01T00:00:00',
  operations: [
    ['vote', { voter: 'alice', author: 'bob', permlink: 'test-post', weight: 10000 }],
    [
      'comment_options',
      {
        author: 'bob',
        permlink: 'test-post',
        max_accepted_payout: '1000000.000 HBD',
        percent_hbd: 10000,
        allow_votes: true,
        allow_curation_rewards: true,
        extensions: [[0, { beneficiaries: [{ account: 'alice', weight: 1000 }] }]]
      }
    ],
    ['transfer', { from: 'alice', to: 'bob', amount: '1.000 HIVE', memo: 'thanks for the post' }]
  ],
  extensions: []
}

const asDhiveTransactionLiteral: dhive.Transaction = legacyTransactionLiteral

/** Virtual (chain-generated) operations are covered by the generic member. */
const virtualOperation: LegacyOperation = [
  'author_reward',
  {
    author: 'bob',
    permlink: 'test-post',
    hbd_payout: '0.000 HBD',
    hive_payout: '0.000 HIVE',
    vesting_payout: '0.000000 VESTS'
  }
]

// ---------------------------------------------------------------------------
// Received transactions (dhive -> legacy)
//
// dhive-typed transactions — e.g. as returned by dhive's
// `cryptoUtils.signTransaction`, `Client.broadcast` results or
// `@aioha/ledger-app-hive` — must be usable as legacy types without casts.
// This works because `LegacyOperation` includes the generic `LegacyOperationBase`
// fallback (whose name union covers virtual operations) just like dhive's
// generic `Operation`.
// ---------------------------------------------------------------------------

declare const receivedDhiveTransaction: dhive.Transaction
const legacyFromDhiveTransaction: LegacyTransaction = receivedDhiveTransaction

declare const receivedDhiveSignedTransaction: dhive.SignedTransaction
const legacyFromDhiveSignedTransaction: LegacySignedTransaction = receivedDhiveSignedTransaction

declare const receivedDhiveOperation: dhive.Operation
const legacyFromDhiveOperation: LegacyOperation = receivedDhiveOperation
const legacyBaseFromDhiveOperation: LegacyOperationBase = receivedDhiveOperation

declare const receivedDhiveOperations: dhive.Operation[]
const legacyFromDhiveOperations: LegacyOperation[] = receivedDhiveOperations

// ---------------------------------------------------------------------------
// Operation names (both directions must cover identical name sets)
// ---------------------------------------------------------------------------

declare const dhiveOperationName: dhive.OperationName
const legacyOperationName: LegacyOperationName = dhiveOperationName
declare const legacyOpName: LegacyOperationName
const dhiveOperationNameBack: dhive.OperationName = legacyOpName

declare const dhiveVirtualOperationName: dhive.VirtualOperationName
const legacyVirtualOperationName: LegacyVirtualOperationName = dhiveVirtualOperationName
declare const legacyVirtualName: LegacyVirtualOperationName
const dhiveVirtualOperationNameBack: dhive.VirtualOperationName = legacyVirtualName

// ---------------------------------------------------------------------------
// Class-typed dhive values
//
// dhive represents assets as the `Asset` class while the legacy wire format
// uses strings ('1.000 HIVE'), so dhive class instances are intentionally not
// assignable to the string-based legacy types.
// ---------------------------------------------------------------------------

declare const dhiveAsset: dhive.Asset
// @ts-expect-error `LegacyAsset` is `string` ('1.000 HIVE'), not a dhive `Asset` instance
const asLegacyAsset: LegacyAsset = dhiveAsset

const _tests = [
  asDhiveTransaction,
  asDhiveSignedTransaction,
  asDhiveOperations,
  asDhiveAccountCreate,
  asDhiveAccountUpdate,
  asDhiveAccountUpdate2,
  asDhiveAccountWitnessProxy,
  asDhiveAccountWitnessVote,
  asDhiveCancelTransferFromSavings,
  asDhiveChangeRecoveryAccount,
  asDhiveClaimAccount,
  asDhiveClaimRewardBalance,
  asDhiveCollateralizedConvert,
  asDhiveComment,
  asDhiveCommentOptions,
  commentOptionsExtensions,
  asDhiveConvert,
  asDhiveCreateClaimedAccount,
  asDhiveCreateProposal,
  asDhiveCustomJson,
  asDhiveDeclineVotingRights,
  asDhiveDelegateVestingShares,
  asDhiveDeleteComment,
  asDhiveEscrowApprove,
  asDhiveEscrowDispute,
  asDhiveEscrowRelease,
  asDhiveEscrowTransfer,
  asDhiveFeedPublish,
  asDhiveLimitOrderCancel,
  asDhiveLimitOrderCreate,
  asDhiveLimitOrderCreate2,
  asDhiveRecoverAccount,
  asDhiveRecurrentTransfer,
  asDhiveRemoveProposal,
  asDhiveRequestAccountRecovery,
  asDhiveResetAccount,
  asDhiveSetResetAccount,
  asDhiveSetWithdrawVestingRoute,
  asDhiveTransfer,
  asDhiveTransferFromSavings,
  asDhiveTransferToSavings,
  asDhiveTransferToVesting,
  asDhiveUpdateProposal,
  asDhiveUpdateProposalVotes,
  asDhiveVote,
  asDhiveWitnessSetProperties,
  asDhiveWitnessUpdate,
  asDhiveWithdrawVesting,
  asDhiveTransactionLiteral,
  virtualOperation,
  legacyFromDhiveTransaction,
  legacyFromDhiveSignedTransaction,
  legacyFromDhiveOperation,
  legacyBaseFromDhiveOperation,
  legacyFromDhiveOperations,
  legacyOperationName,
  dhiveOperationNameBack,
  legacyVirtualOperationName,
  dhiveVirtualOperationNameBack
]
export { _tests }
