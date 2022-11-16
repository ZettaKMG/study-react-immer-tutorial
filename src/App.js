// immer를 사용하지 않고 불변성 유지
// import React, {useRef, useCallback, useState} from 'react';

// const App = () => {
//   const nextId = useRef(1);
//   const [form, setForm] = useState({name: '', username: ''});
//   const [data, setData] = useState({
//     array: [],
//     uselessValue: null
//   });

//   // input 수정을 위한 함수
//   const onChange = useCallback(
//     e => {
//       const {name, value} = e.target;
//       setForm({
//         ...form,
//         [name]: [value]
//       });
//     },
//     [form]
//   );

//   // form 등록을 위한 함수
//   const onSubmit = useCallback(
//     e => {
//       e.preventDefault();
//       const info = {
//         id: nextId.current,
//         name: form.name,
//         username: form.username
//       };

//       // array에 새 항목 등록
//       setData({
//         ...data,
//         array: data.array.concat(info)
//       });

//       // form 초기화
//       setForm({
//         name: '',
//         username: ''
//       });
//       nextId.current += 1;
//     },
//     [data, form.name, form.username]
//   );

//   // 항목을 삭제하는 함수
//   const onRemove = useCallback(
//     id => {
//       setData({
//         ...data,
//         array: data.array.filter(info => info.id !== id)
//       });
//     },
//     [data]
//   );

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <input name="username" placeholder="아이디" value={form.username} onChange={onChange} />
//         <input name="name" placeholder="이름" value={form.name} onChange={onChange} />
//         <button type="submit">등록</button>
//       </form>
//       <>
//         <ul>
//           {data.array.map(info => (
//             <li key={info.id} onClick={() => onRemove(info.id)}>
//               {info.username} ({info.name})
//             </li>
//           ))}
//         </ul>
//       </>
//     </>
//   );
// };

// export default App;

// immer 사용법
// 예시
// import produce from 'immer';
// import { DRAFTABLE } from 'immer/dist/internal';
// const nextState = produce(originalState, draft => {
//   // 바꾸고 싶은 값 바꾸기
//   DRAFTABLE.somewhere.deep.inside = 5;
// })

// 좀 더 복잡한 데이터를 불변성 유지하면서 업데이트
// 예시
// import produce from 'immer';
// import { DRAFTABLE } from 'immer/dist/internal';

// const originalState = [
//   {
//     id: 1,
//     todo: '전개 연산자와 배열 내장 함수로 불변성 유지하기',
//     checked: true,
//   },
//   {
//     id: 2,
//     todo: 'immer로 불변성 유지하가',
//     checked: false,
//   }
// ];

// const nextState = produce(originalState, draft => {
//   // id가 2인 항목의 checked 값을 true로 설정
//   const todo = draft.find(t => t.id === 2); // id로 항목 찾기
//   todo.checked = true;
//     // 혹은 draft[1].checked = true;

//   // 배열에 새로운 데이터 추가
//   draft.push({
//     id: 3,
//     todo: '일정 관리 앱에 immer 적용하기',
//     checked: false,
//   });

//   // id = 1인 항목을 제거하기
//   draft.splice(draft.findIndex(t => t.id === 1), 1);
// });

// App 컴포넌트에 immer 적용하기
import React, {useRef, useCallback, useState} from 'react';
import produce from 'immer';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({name: '', username: ''});
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // input 수정을 위한 함수
  const onChange = useCallback(
    e => {
      const {name, value} = e.target;
      setForm(
        produce(form, draft => {
          draft[name] = value;
        })
      );
      // setForm({
      //   ...form,
      //   [name]: [value]
      // });
    },
    [form]
  );

  // form 등록을 위한 함수
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      };

      // array에 새 항목 등록
      setData(
        produce(data, draft => {
          draft.array.push(info);
        })
      );
      // setData({
      //   ...data,
      //   array: data.array.concat(info)
      // });

      // form 초기화
      setForm({
        name: '',
        username: ''
      });
      nextId.current += 1;
    },
    [data, form.name, form.username]
  );

  // 항목을 삭제하는 함수
  const onRemove = useCallback(
    id => {
      setData(
        produce(data, draft => {
          draft.array.splice(drafe.array.findIndex(info => info.id === id), 1);
        })
      );
      // setData({
      //   ...data,
      //   array: data.array.filter(info => info.id !== id)
      // });
    },
    [data]
  );

  return (
    <>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="아이디" value={form.username} onChange={onChange} />
        <input name="name" placeholder="이름" value={form.name} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </>
    </>
  );
};

export default App;