import { Abi } from 'starknet'

export const InfiniteAbi: Abi = [
  {
    inputs: [],
    name: 'constructor',
    outputs: [],
    type: 'constructor',
  },
  {
    inputs: [
      {
        name: 'user_id',
        type: 'felt',
      },
    ],
    name: 'evolve_and_claim_next_generation',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'user_id',
        type: 'felt',
      },
      {
        name: 'cell_row_index',
        type: 'felt',
      },
      {
        name: 'cell_column_index',
        type: 'felt',
      },
      {
        name: 'gen_id_of_token_to_redeem',
        type: 'felt',
      },
    ],
    name: 'give_life_to_cell',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [],
    name: 'current_generation_id',
    outputs: [
      {
        name: 'gen_id',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latest_give_life_index',
    outputs: [
      {
        name: 'redemption_index',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'token_id',
        type: 'felt',
      },
    ],
    name: 'redemption_index_from_token_id',
    outputs: [
      {
        name: 'red_index',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'red_index',
        type: 'felt',
      },
    ],
    name: 'token_id_from_redemption_index',
    outputs: [
      {
        name: 'token_id',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'generation_id',
        type: 'felt',
      },
    ],
    name: 'highest_redemption_index_of_generation',
    outputs: [
      {
        name: 'redemption_index',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'id_of_generation_to_view',
        type: 'felt',
      },
    ],
    name: 'view_game',
    outputs: [
      {
        name: 'row_0',
        type: 'felt',
      },
      {
        name: 'row_1',
        type: 'felt',
      },
      {
        name: 'row_2',
        type: 'felt',
      },
      {
        name: 'row_3',
        type: 'felt',
      },
      {
        name: 'row_4',
        type: 'felt',
      },
      {
        name: 'row_5',
        type: 'felt',
      },
      {
        name: 'row_6',
        type: 'felt',
      },
      {
        name: 'row_7',
        type: 'felt',
      },
      {
        name: 'row_8',
        type: 'felt',
      },
      {
        name: 'row_9',
        type: 'felt',
      },
      {
        name: 'row_10',
        type: 'felt',
      },
      {
        name: 'row_11',
        type: 'felt',
      },
      {
        name: 'row_12',
        type: 'felt',
      },
      {
        name: 'row_13',
        type: 'felt',
      },
      {
        name: 'row_14',
        type: 'felt',
      },
      {
        name: 'row_15',
        type: 'felt',
      },
      {
        name: 'row_16',
        type: 'felt',
      },
      {
        name: 'row_17',
        type: 'felt',
      },
      {
        name: 'row_18',
        type: 'felt',
      },
      {
        name: 'row_19',
        type: 'felt',
      },
      {
        name: 'row_20',
        type: 'felt',
      },
      {
        name: 'row_21',
        type: 'felt',
      },
      {
        name: 'row_22',
        type: 'felt',
      },
      {
        name: 'row_23',
        type: 'felt',
      },
      {
        name: 'row_24',
        type: 'felt',
      },
      {
        name: 'row_25',
        type: 'felt',
      },
      {
        name: 'row_26',
        type: 'felt',
      },
      {
        name: 'row_27',
        type: 'felt',
      },
      {
        name: 'row_28',
        type: 'felt',
      },
      {
        name: 'row_29',
        type: 'felt',
      },
      {
        name: 'row_30',
        type: 'felt',
      },
      {
        name: 'row_31',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'user_id',
        type: 'felt',
      },
    ],
    name: 'user_token_count',
    outputs: [
      {
        name: 'count',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'user_id',
        type: 'felt',
      },
      {
        name: 'nth_token_of_user',
        type: 'felt',
      },
    ],
    name: 'get_user_data',
    outputs: [
      {
        name: 'token_id',
        type: 'felt',
      },
      {
        name: 'has_used_give_life',
        type: 'felt',
      },
      {
        name: 'generation_during_give_life',
        type: 'felt',
      },
      {
        name: 'alive_cell_row',
        type: 'felt',
      },
      {
        name: 'alive_cell_col',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'token_id',
        type: 'felt',
      },
    ],
    name: 'get_token_data',
    outputs: [
      {
        name: 'has_used_give_life',
        type: 'felt',
      },
      {
        name: 'generation_during_give_life',
        type: 'felt',
      },
      {
        name: 'alive_cell_row',
        type: 'felt',
      },
      {
        name: 'alive_cell_col',
        type: 'felt',
      },
      {
        name: 'owner',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'enter_zero_or_specific_generation_id',
        type: 'felt',
      },
    ],
    name: 'latest_useful_state',
    outputs: [
      {
        name: 'gen_id',
        type: 'felt',
      },
      {
        name: 'latest_red',
        type: 'felt',
      },
      {
        name: 'a_owner',
        type: 'felt',
      },
      {
        name: 'b_owner',
        type: 'felt',
      },
      {
        name: 'c_owner',
        type: 'felt',
      },
      {
        name: 'r0_id',
        type: 'felt',
      },
      {
        name: 'r0_gen',
        type: 'felt',
      },
      {
        name: 'r0_row',
        type: 'felt',
      },
      {
        name: 'r0_col',
        type: 'felt',
      },
      {
        name: 'r0_owner',
        type: 'felt',
      },
      {
        name: 'r1_id',
        type: 'felt',
      },
      {
        name: 'r1_gen',
        type: 'felt',
      },
      {
        name: 'r1_row',
        type: 'felt',
      },
      {
        name: 'r1_col',
        type: 'felt',
      },
      {
        name: 'r1_owner',
        type: 'felt',
      },
      {
        name: 'r2_id',
        type: 'felt',
      },
      {
        name: 'r2_gen',
        type: 'felt',
      },
      {
        name: 'r2_row',
        type: 'felt',
      },
      {
        name: 'r2_col',
        type: 'felt',
      },
      {
        name: 'r2_owner',
        type: 'felt',
      },
      {
        name: 'r3_id',
        type: 'felt',
      },
      {
        name: 'r3_gen',
        type: 'felt',
      },
      {
        name: 'r3_row',
        type: 'felt',
      },
      {
        name: 'r3_col',
        type: 'felt',
      },
      {
        name: 'r3_owner',
        type: 'felt',
      },
      {
        name: 'r4_id',
        type: 'felt',
      },
      {
        name: 'r4_gen',
        type: 'felt',
      },
      {
        name: 'r4_row',
        type: 'felt',
      },
      {
        name: 'r4_col',
        type: 'felt',
      },
      {
        name: 'r4_owner',
        type: 'felt',
      },
      {
        name: 'r5_id',
        type: 'felt',
      },
      {
        name: 'r5_gen',
        type: 'felt',
      },
      {
        name: 'r5_row',
        type: 'felt',
      },
      {
        name: 'r5_col',
        type: 'felt',
      },
      {
        name: 'r5_owner',
        type: 'felt',
      },
      {
        name: 'r6_id',
        type: 'felt',
      },
      {
        name: 'r6_gen',
        type: 'felt',
      },
      {
        name: 'r6_row',
        type: 'felt',
      },
      {
        name: 'r6_col',
        type: 'felt',
      },
      {
        name: 'r6_owner',
        type: 'felt',
      },
      {
        name: 'r7_id',
        type: 'felt',
      },
      {
        name: 'r7_gen',
        type: 'felt',
      },
      {
        name: 'r7_row',
        type: 'felt',
      },
      {
        name: 'r7_col',
        type: 'felt',
      },
      {
        name: 'r7_owner',
        type: 'felt',
      },
      {
        name: 'r8_id',
        type: 'felt',
      },
      {
        name: 'r8_gen',
        type: 'felt',
      },
      {
        name: 'r8_row',
        type: 'felt',
      },
      {
        name: 'r8_col',
        type: 'felt',
      },
      {
        name: 'r8_owner',
        type: 'felt',
      },
      {
        name: 'r9_id',
        type: 'felt',
      },
      {
        name: 'r9_gen',
        type: 'felt',
      },
      {
        name: 'r9_row',
        type: 'felt',
      },
      {
        name: 'r9_col',
        type: 'felt',
      },
      {
        name: 'r9_owner',
        type: 'felt',
      },
      {
        name: 'a0',
        type: 'felt',
      },
      {
        name: 'a1',
        type: 'felt',
      },
      {
        name: 'a2',
        type: 'felt',
      },
      {
        name: 'a3',
        type: 'felt',
      },
      {
        name: 'a4',
        type: 'felt',
      },
      {
        name: 'a5',
        type: 'felt',
      },
      {
        name: 'a6',
        type: 'felt',
      },
      {
        name: 'a7',
        type: 'felt',
      },
      {
        name: 'a8',
        type: 'felt',
      },
      {
        name: 'a9',
        type: 'felt',
      },
      {
        name: 'a10',
        type: 'felt',
      },
      {
        name: 'a11',
        type: 'felt',
      },
      {
        name: 'a12',
        type: 'felt',
      },
      {
        name: 'a13',
        type: 'felt',
      },
      {
        name: 'a14',
        type: 'felt',
      },
      {
        name: 'a15',
        type: 'felt',
      },
      {
        name: 'a16',
        type: 'felt',
      },
      {
        name: 'a17',
        type: 'felt',
      },
      {
        name: 'a18',
        type: 'felt',
      },
      {
        name: 'a19',
        type: 'felt',
      },
      {
        name: 'a20',
        type: 'felt',
      },
      {
        name: 'a21',
        type: 'felt',
      },
      {
        name: 'a22',
        type: 'felt',
      },
      {
        name: 'a23',
        type: 'felt',
      },
      {
        name: 'a24',
        type: 'felt',
      },
      {
        name: 'a25',
        type: 'felt',
      },
      {
        name: 'a26',
        type: 'felt',
      },
      {
        name: 'a27',
        type: 'felt',
      },
      {
        name: 'a28',
        type: 'felt',
      },
      {
        name: 'a29',
        type: 'felt',
      },
      {
        name: 'a30',
        type: 'felt',
      },
      {
        name: 'a31',
        type: 'felt',
      },
      {
        name: 'b0',
        type: 'felt',
      },
      {
        name: 'b1',
        type: 'felt',
      },
      {
        name: 'b2',
        type: 'felt',
      },
      {
        name: 'b3',
        type: 'felt',
      },
      {
        name: 'b4',
        type: 'felt',
      },
      {
        name: 'b5',
        type: 'felt',
      },
      {
        name: 'b6',
        type: 'felt',
      },
      {
        name: 'b7',
        type: 'felt',
      },
      {
        name: 'b8',
        type: 'felt',
      },
      {
        name: 'b9',
        type: 'felt',
      },
      {
        name: 'b10',
        type: 'felt',
      },
      {
        name: 'b11',
        type: 'felt',
      },
      {
        name: 'b12',
        type: 'felt',
      },
      {
        name: 'b13',
        type: 'felt',
      },
      {
        name: 'b14',
        type: 'felt',
      },
      {
        name: 'b15',
        type: 'felt',
      },
      {
        name: 'b16',
        type: 'felt',
      },
      {
        name: 'b17',
        type: 'felt',
      },
      {
        name: 'b18',
        type: 'felt',
      },
      {
        name: 'b19',
        type: 'felt',
      },
      {
        name: 'b20',
        type: 'felt',
      },
      {
        name: 'b21',
        type: 'felt',
      },
      {
        name: 'b22',
        type: 'felt',
      },
      {
        name: 'b23',
        type: 'felt',
      },
      {
        name: 'b24',
        type: 'felt',
      },
      {
        name: 'b25',
        type: 'felt',
      },
      {
        name: 'b26',
        type: 'felt',
      },
      {
        name: 'b27',
        type: 'felt',
      },
      {
        name: 'b28',
        type: 'felt',
      },
      {
        name: 'b29',
        type: 'felt',
      },
      {
        name: 'b30',
        type: 'felt',
      },
      {
        name: 'b31',
        type: 'felt',
      },
      {
        name: 'c0',
        type: 'felt',
      },
      {
        name: 'c1',
        type: 'felt',
      },
      {
        name: 'c2',
        type: 'felt',
      },
      {
        name: 'c3',
        type: 'felt',
      },
      {
        name: 'c4',
        type: 'felt',
      },
      {
        name: 'c5',
        type: 'felt',
      },
      {
        name: 'c6',
        type: 'felt',
      },
      {
        name: 'c7',
        type: 'felt',
      },
      {
        name: 'c8',
        type: 'felt',
      },
      {
        name: 'c9',
        type: 'felt',
      },
      {
        name: 'c10',
        type: 'felt',
      },
      {
        name: 'c11',
        type: 'felt',
      },
      {
        name: 'c12',
        type: 'felt',
      },
      {
        name: 'c13',
        type: 'felt',
      },
      {
        name: 'c14',
        type: 'felt',
      },
      {
        name: 'c15',
        type: 'felt',
      },
      {
        name: 'c16',
        type: 'felt',
      },
      {
        name: 'c17',
        type: 'felt',
      },
      {
        name: 'c18',
        type: 'felt',
      },
      {
        name: 'c19',
        type: 'felt',
      },
      {
        name: 'c20',
        type: 'felt',
      },
      {
        name: 'c21',
        type: 'felt',
      },
      {
        name: 'c22',
        type: 'felt',
      },
      {
        name: 'c23',
        type: 'felt',
      },
      {
        name: 'c24',
        type: 'felt',
      },
      {
        name: 'c25',
        type: 'felt',
      },
      {
        name: 'c26',
        type: 'felt',
      },
      {
        name: 'c27',
        type: 'felt',
      },
      {
        name: 'c28',
        type: 'felt',
      },
      {
        name: 'c29',
        type: 'felt',
      },
      {
        name: 'c30',
        type: 'felt',
      },
      {
        name: 'c31',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'gen_ids_array_len',
        type: 'felt',
      },
      {
        name: 'gen_ids_array',
        type: 'felt*',
      },
      {
        name: 'n_latest_states',
        type: 'felt',
      },
      {
        name: 'give_life_array_len',
        type: 'felt',
      },
      {
        name: 'give_life_array',
        type: 'felt*',
      },
      {
        name: 'n_latest_give_life',
        type: 'felt',
      },
    ],
    name: 'get_arbitrary_state_arrays',
    outputs: [
      {
        name: 'current_generation_id',
        type: 'felt',
      },
      {
        name: 'gen_ids_array_result_len',
        type: 'felt',
      },
      {
        name: 'gen_ids_array_result',
        type: 'felt*',
      },
      {
        name: 'specific_state_owners_len',
        type: 'felt',
      },
      {
        name: 'specific_state_owners',
        type: 'felt*',
      },
      {
        name: 'n_latest_states_result_len',
        type: 'felt',
      },
      {
        name: 'n_latest_states_result',
        type: 'felt*',
      },
      {
        name: 'latest_state_owners_len',
        type: 'felt',
      },
      {
        name: 'latest_state_owners',
        type: 'felt*',
      },
      {
        name: 'latest_redemption_index',
        type: 'felt',
      },
      {
        name: 'give_life_array_result_len',
        type: 'felt',
      },
      {
        name: 'give_life_array_result',
        type: 'felt*',
      },
      {
        name: 'n_latest_give_life_result_len',
        type: 'felt',
      },
      {
        name: 'n_latest_give_life_result',
        type: 'felt*',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'user_id',
        type: 'felt',
      },
    ],
    name: 'get_user_tokens',
    outputs: [
      {
        name: 'token_ids_len',
        type: 'felt',
      },
      {
        name: 'token_ids',
        type: 'felt*',
      },
      {
        name: 'gave_life_at_len',
        type: 'felt',
      },
      {
        name: 'gave_life_at',
        type: 'felt*',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
