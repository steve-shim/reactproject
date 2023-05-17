const prjctList = [
    { id: 22, prjct_no: 'P202200009', prjct_nm: 'test_ssh', prjct_st_cd: 'A', prjct_st: '활동' },
    { id: 24, prjct_no: 'P202200011', prjct_nm: 'ssh_test3', prjct_st_cd: 'A', prjct_st: '활동' },
    { id: 25, prjct_no: 'P202200012', prjct_nm: 'test4', prjct_st_cd: 'A', prjct_st: '활동' },
    { id: 28, prjct_no: 'P202200015', prjct_nm: 'test7', prjct_st_cd: 'A', prjct_st: '활동' }
]

console.log(prjctList[0])
console.log(Object.keys(prjctList[0]))

for (let i = 0; i < prjctList.length; i++) {
    if (prjctList[i].id === 28) {
        console.log(prjctList[i])
    }
}

let pgm_path = '';
let = pgm_id = 'LAP010203';
pgm_path = pgm_id.substring(0, 3) + '/' + pgm_id;
console.log(pgm_path)

let target = [];
let data_node = 'selectedRowKey';
for (let i = 0; i < data_node.split('.').length; i++) {
    target.push(data_node.split('.')[i]);
}
console.log(target)
console.log(data_node.split('.'))