import { Abi } from 'starknet'

export const CreatorModeAddress = '0x021720286a97c4cb4504de696a28f60a421af77a21f5da9df717d071756d9734'

export const CreatorModeAbi: Abi = [
  {
    inputs: [],
    name: 'constructor',
    outputs: [],
    type: 'constructor',
  },
  {
    inputs: [
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
    name: 'create',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'game_index',
        type: 'felt',
      },
    ],
    name: 'contribute',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [],
    name: 'newest_game',
    outputs: [
      {
        name: 'game_index',
        type: 'felt',
      },
      {
        name: 'game_id',
        type: 'felt',
      },
      {
        name: 'generation',
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
    name: 'user_counts',
    outputs: [
      {
        name: 'game_count',
        type: 'felt',
      },
      {
        name: 'credit_count',
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
        name: 'index_of_inventory',
        type: 'felt',
      },
    ],
    name: 'specific_game_of_user',
    outputs: [
      {
        name: 'game_index',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'game_index',
        type: 'felt',
      },
    ],
    name: 'generation_of_game',
    outputs: [
      {
        name: 'generation',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'game_index',
        type: 'felt',
      },
      {
        name: 'gen',
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
        name: 'enter_zero_or_specific_game_index',
        type: 'felt',
      },
    ],
    name: 'get_recently_created',
    outputs: [
      {
        name: 'game_index',
        type: 'felt',
      },
      {
        name: 'a_gen',
        type: 'felt',
      },
      {
        name: 'b_gen',
        type: 'felt',
      },
      {
        name: 'c_gen',
        type: 'felt',
      },
      {
        name: 'd_gen',
        type: 'felt',
      },
      {
        name: 'e_gen',
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
        name: 'd_owner',
        type: 'felt',
      },
      {
        name: 'e_owner',
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
      {
        name: 'd0',
        type: 'felt',
      },
      {
        name: 'd1',
        type: 'felt',
      },
      {
        name: 'd2',
        type: 'felt',
      },
      {
        name: 'd3',
        type: 'felt',
      },
      {
        name: 'd4',
        type: 'felt',
      },
      {
        name: 'd5',
        type: 'felt',
      },
      {
        name: 'd6',
        type: 'felt',
      },
      {
        name: 'd7',
        type: 'felt',
      },
      {
        name: 'd8',
        type: 'felt',
      },
      {
        name: 'd9',
        type: 'felt',
      },
      {
        name: 'd10',
        type: 'felt',
      },
      {
        name: 'd11',
        type: 'felt',
      },
      {
        name: 'd12',
        type: 'felt',
      },
      {
        name: 'd13',
        type: 'felt',
      },
      {
        name: 'd14',
        type: 'felt',
      },
      {
        name: 'd15',
        type: 'felt',
      },
      {
        name: 'd16',
        type: 'felt',
      },
      {
        name: 'd17',
        type: 'felt',
      },
      {
        name: 'd18',
        type: 'felt',
      },
      {
        name: 'd19',
        type: 'felt',
      },
      {
        name: 'd20',
        type: 'felt',
      },
      {
        name: 'd21',
        type: 'felt',
      },
      {
        name: 'd22',
        type: 'felt',
      },
      {
        name: 'd23',
        type: 'felt',
      },
      {
        name: 'd24',
        type: 'felt',
      },
      {
        name: 'd25',
        type: 'felt',
      },
      {
        name: 'd26',
        type: 'felt',
      },
      {
        name: 'd27',
        type: 'felt',
      },
      {
        name: 'd28',
        type: 'felt',
      },
      {
        name: 'd29',
        type: 'felt',
      },
      {
        name: 'd30',
        type: 'felt',
      },
      {
        name: 'd31',
        type: 'felt',
      },
      {
        name: 'e0',
        type: 'felt',
      },
      {
        name: 'e1',
        type: 'felt',
      },
      {
        name: 'e2',
        type: 'felt',
      },
      {
        name: 'e3',
        type: 'felt',
      },
      {
        name: 'e4',
        type: 'felt',
      },
      {
        name: 'e5',
        type: 'felt',
      },
      {
        name: 'e6',
        type: 'felt',
      },
      {
        name: 'e7',
        type: 'felt',
      },
      {
        name: 'e8',
        type: 'felt',
      },
      {
        name: 'e9',
        type: 'felt',
      },
      {
        name: 'e10',
        type: 'felt',
      },
      {
        name: 'e11',
        type: 'felt',
      },
      {
        name: 'e12',
        type: 'felt',
      },
      {
        name: 'e13',
        type: 'felt',
      },
      {
        name: 'e14',
        type: 'felt',
      },
      {
        name: 'e15',
        type: 'felt',
      },
      {
        name: 'e16',
        type: 'felt',
      },
      {
        name: 'e17',
        type: 'felt',
      },
      {
        name: 'e18',
        type: 'felt',
      },
      {
        name: 'e19',
        type: 'felt',
      },
      {
        name: 'e20',
        type: 'felt',
      },
      {
        name: 'e21',
        type: 'felt',
      },
      {
        name: 'e22',
        type: 'felt',
      },
      {
        name: 'e23',
        type: 'felt',
      },
      {
        name: 'e24',
        type: 'felt',
      },
      {
        name: 'e25',
        type: 'felt',
      },
      {
        name: 'e26',
        type: 'felt',
      },
      {
        name: 'e27',
        type: 'felt',
      },
      {
        name: 'e28',
        type: 'felt',
      },
      {
        name: 'e29',
        type: 'felt',
      },
      {
        name: 'e30',
        type: 'felt',
      },
      {
        name: 'e31',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'enter_zero_or_specific_game_index',
        type: 'felt',
      },
    ],
    name: 'get_recent_generations_of_game',
    outputs: [
      {
        name: 'owner',
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
      {
        name: 'd0',
        type: 'felt',
      },
      {
        name: 'd1',
        type: 'felt',
      },
      {
        name: 'd2',
        type: 'felt',
      },
      {
        name: 'd3',
        type: 'felt',
      },
      {
        name: 'd4',
        type: 'felt',
      },
      {
        name: 'd5',
        type: 'felt',
      },
      {
        name: 'd6',
        type: 'felt',
      },
      {
        name: 'd7',
        type: 'felt',
      },
      {
        name: 'd8',
        type: 'felt',
      },
      {
        name: 'd9',
        type: 'felt',
      },
      {
        name: 'd10',
        type: 'felt',
      },
      {
        name: 'd11',
        type: 'felt',
      },
      {
        name: 'd12',
        type: 'felt',
      },
      {
        name: 'd13',
        type: 'felt',
      },
      {
        name: 'd14',
        type: 'felt',
      },
      {
        name: 'd15',
        type: 'felt',
      },
      {
        name: 'd16',
        type: 'felt',
      },
      {
        name: 'd17',
        type: 'felt',
      },
      {
        name: 'd18',
        type: 'felt',
      },
      {
        name: 'd19',
        type: 'felt',
      },
      {
        name: 'd20',
        type: 'felt',
      },
      {
        name: 'd21',
        type: 'felt',
      },
      {
        name: 'd22',
        type: 'felt',
      },
      {
        name: 'd23',
        type: 'felt',
      },
      {
        name: 'd24',
        type: 'felt',
      },
      {
        name: 'd25',
        type: 'felt',
      },
      {
        name: 'd26',
        type: 'felt',
      },
      {
        name: 'd27',
        type: 'felt',
      },
      {
        name: 'd28',
        type: 'felt',
      },
      {
        name: 'd29',
        type: 'felt',
      },
      {
        name: 'd30',
        type: 'felt',
      },
      {
        name: 'd31',
        type: 'felt',
      },
      {
        name: 'e0',
        type: 'felt',
      },
      {
        name: 'e1',
        type: 'felt',
      },
      {
        name: 'e2',
        type: 'felt',
      },
      {
        name: 'e3',
        type: 'felt',
      },
      {
        name: 'e4',
        type: 'felt',
      },
      {
        name: 'e5',
        type: 'felt',
      },
      {
        name: 'e6',
        type: 'felt',
      },
      {
        name: 'e7',
        type: 'felt',
      },
      {
        name: 'e8',
        type: 'felt',
      },
      {
        name: 'e9',
        type: 'felt',
      },
      {
        name: 'e10',
        type: 'felt',
      },
      {
        name: 'e11',
        type: 'felt',
      },
      {
        name: 'e12',
        type: 'felt',
      },
      {
        name: 'e13',
        type: 'felt',
      },
      {
        name: 'e14',
        type: 'felt',
      },
      {
        name: 'e15',
        type: 'felt',
      },
      {
        name: 'e16',
        type: 'felt',
      },
      {
        name: 'e17',
        type: 'felt',
      },
      {
        name: 'e18',
        type: 'felt',
      },
      {
        name: 'e19',
        type: 'felt',
      },
      {
        name: 'e20',
        type: 'felt',
      },
      {
        name: 'e21',
        type: 'felt',
      },
      {
        name: 'e22',
        type: 'felt',
      },
      {
        name: 'e23',
        type: 'felt',
      },
      {
        name: 'e24',
        type: 'felt',
      },
      {
        name: 'e25',
        type: 'felt',
      },
      {
        name: 'e26',
        type: 'felt',
      },
      {
        name: 'e27',
        type: 'felt',
      },
      {
        name: 'e28',
        type: 'felt',
      },
      {
        name: 'e29',
        type: 'felt',
      },
      {
        name: 'e30',
        type: 'felt',
      },
      {
        name: 'e31',
        type: 'felt',
      },
      {
        name: 'z0',
        type: 'felt',
      },
      {
        name: 'z1',
        type: 'felt',
      },
      {
        name: 'z2',
        type: 'felt',
      },
      {
        name: 'z3',
        type: 'felt',
      },
      {
        name: 'z4',
        type: 'felt',
      },
      {
        name: 'z5',
        type: 'felt',
      },
      {
        name: 'z6',
        type: 'felt',
      },
      {
        name: 'z7',
        type: 'felt',
      },
      {
        name: 'z8',
        type: 'felt',
      },
      {
        name: 'z9',
        type: 'felt',
      },
      {
        name: 'z10',
        type: 'felt',
      },
      {
        name: 'z11',
        type: 'felt',
      },
      {
        name: 'z12',
        type: 'felt',
      },
      {
        name: 'z13',
        type: 'felt',
      },
      {
        name: 'z14',
        type: 'felt',
      },
      {
        name: 'z15',
        type: 'felt',
      },
      {
        name: 'z16',
        type: 'felt',
      },
      {
        name: 'z17',
        type: 'felt',
      },
      {
        name: 'z18',
        type: 'felt',
      },
      {
        name: 'z19',
        type: 'felt',
      },
      {
        name: 'z20',
        type: 'felt',
      },
      {
        name: 'z21',
        type: 'felt',
      },
      {
        name: 'z22',
        type: 'felt',
      },
      {
        name: 'z23',
        type: 'felt',
      },
      {
        name: 'z24',
        type: 'felt',
      },
      {
        name: 'z25',
        type: 'felt',
      },
      {
        name: 'z26',
        type: 'felt',
      },
      {
        name: 'z27',
        type: 'felt',
      },
      {
        name: 'z28',
        type: 'felt',
      },
      {
        name: 'z29',
        type: 'felt',
      },
      {
        name: 'z30',
        type: 'felt',
      },
      {
        name: 'z31',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'user_address',
        type: 'felt',
      },
      {
        name: 'enter_zero_or_specific_inventory_index',
        type: 'felt',
      },
    ],
    name: 'get_user_data',
    outputs: [
      {
        name: 'count',
        type: 'felt',
      },
      {
        name: 'credits',
        type: 'felt',
      },
      {
        name: 'a_index',
        type: 'felt',
      },
      {
        name: 'b_index',
        type: 'felt',
      },
      {
        name: 'c_index',
        type: 'felt',
      },
      {
        name: 'd_index',
        type: 'felt',
      },
      {
        name: 'e_index',
        type: 'felt',
      },
      {
        name: 'a_gen',
        type: 'felt',
      },
      {
        name: 'b_gen',
        type: 'felt',
      },
      {
        name: 'c_gen',
        type: 'felt',
      },
      {
        name: 'd_gen',
        type: 'felt',
      },
      {
        name: 'e_gen',
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
      {
        name: 'd0',
        type: 'felt',
      },
      {
        name: 'd1',
        type: 'felt',
      },
      {
        name: 'd2',
        type: 'felt',
      },
      {
        name: 'd3',
        type: 'felt',
      },
      {
        name: 'd4',
        type: 'felt',
      },
      {
        name: 'd5',
        type: 'felt',
      },
      {
        name: 'd6',
        type: 'felt',
      },
      {
        name: 'd7',
        type: 'felt',
      },
      {
        name: 'd8',
        type: 'felt',
      },
      {
        name: 'd9',
        type: 'felt',
      },
      {
        name: 'd10',
        type: 'felt',
      },
      {
        name: 'd11',
        type: 'felt',
      },
      {
        name: 'd12',
        type: 'felt',
      },
      {
        name: 'd13',
        type: 'felt',
      },
      {
        name: 'd14',
        type: 'felt',
      },
      {
        name: 'd15',
        type: 'felt',
      },
      {
        name: 'd16',
        type: 'felt',
      },
      {
        name: 'd17',
        type: 'felt',
      },
      {
        name: 'd18',
        type: 'felt',
      },
      {
        name: 'd19',
        type: 'felt',
      },
      {
        name: 'd20',
        type: 'felt',
      },
      {
        name: 'd21',
        type: 'felt',
      },
      {
        name: 'd22',
        type: 'felt',
      },
      {
        name: 'd23',
        type: 'felt',
      },
      {
        name: 'd24',
        type: 'felt',
      },
      {
        name: 'd25',
        type: 'felt',
      },
      {
        name: 'd26',
        type: 'felt',
      },
      {
        name: 'd27',
        type: 'felt',
      },
      {
        name: 'd28',
        type: 'felt',
      },
      {
        name: 'd29',
        type: 'felt',
      },
      {
        name: 'd30',
        type: 'felt',
      },
      {
        name: 'd31',
        type: 'felt',
      },
      {
        name: 'e0',
        type: 'felt',
      },
      {
        name: 'e1',
        type: 'felt',
      },
      {
        name: 'e2',
        type: 'felt',
      },
      {
        name: 'e3',
        type: 'felt',
      },
      {
        name: 'e4',
        type: 'felt',
      },
      {
        name: 'e5',
        type: 'felt',
      },
      {
        name: 'e6',
        type: 'felt',
      },
      {
        name: 'e7',
        type: 'felt',
      },
      {
        name: 'e8',
        type: 'felt',
      },
      {
        name: 'e9',
        type: 'felt',
      },
      {
        name: 'e10',
        type: 'felt',
      },
      {
        name: 'e11',
        type: 'felt',
      },
      {
        name: 'e12',
        type: 'felt',
      },
      {
        name: 'e13',
        type: 'felt',
      },
      {
        name: 'e14',
        type: 'felt',
      },
      {
        name: 'e15',
        type: 'felt',
      },
      {
        name: 'e16',
        type: 'felt',
      },
      {
        name: 'e17',
        type: 'felt',
      },
      {
        name: 'e18',
        type: 'felt',
      },
      {
        name: 'e19',
        type: 'felt',
      },
      {
        name: 'e20',
        type: 'felt',
      },
      {
        name: 'e21',
        type: 'felt',
      },
      {
        name: 'e22',
        type: 'felt',
      },
      {
        name: 'e23',
        type: 'felt',
      },
      {
        name: 'e24',
        type: 'felt',
      },
      {
        name: 'e25',
        type: 'felt',
      },
      {
        name: 'e26',
        type: 'felt',
      },
      {
        name: 'e27',
        type: 'felt',
      },
      {
        name: 'e28',
        type: 'felt',
      },
      {
        name: 'e29',
        type: 'felt',
      },
      {
        name: 'e30',
        type: 'felt',
      },
      {
        name: 'e31',
        type: 'felt',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'user_address',
        type: 'felt',
      },
      {
        name: 'n_games_to_fetch',
        type: 'felt',
      },
      {
        name: 'n_gens_to_fetch_per_game',
        type: 'felt',
      },
    ],
    name: 'get_recent_user_data',
    outputs: [
      {
        name: 'credits',
        type: 'felt',
      },
      {
        name: 'games_owned_len',
        type: 'felt',
      },
      {
        name: 'games_owned',
        type: 'felt*',
      },
      {
        name: 'states_len',
        type: 'felt',
      },
      {
        name: 'states',
        type: 'felt*',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
