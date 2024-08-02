'use client';

import { getAIAnswers } from '@/actions/actions';
import { Button, TextInput } from '@carbon/react';
import { useEffect, useRef, useState } from 'react';
import { Send } from '@carbon/icons-react';

export default function AIPage() {
  const [results, setResults] = useState([]);
  const [question, setQuestion] = useState('');
  const ref = useRef();

  useEffect(() => {
    if (ref) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [results]);
  const loadData = () => {
    getAIAnswers({
      question: question,
    }).then((res) => {
      let answer = res.answer;
      if (res.error) {
        answer = 'The system is busy';
      }
      setResults([
        ...results,
        {
          question: question,
          answer: answer,
        },
      ]);
    });
  };
  const handleCommit = () => {
    loadData();
    if (ref) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center bg-transparent">
        <div className="w-3/4 ">
          <div
            ref={ref}
            className=" bg-[#e6eaf4] p-4 h-[550px] border-[1px]
             border-cyan-400 border-solid overflow-auto"
          >
            {results.map((item, index) => {
              return (
                <div key={index} className="mb-3 bg-white p-4 rounded-sm">
                  <p className=" font-semibold">
                    Q{index + 1}: {item.question}
                  </p>
                  <p> {item.answer}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <div className="flex flex-row">
              <TextInput
                placeholder="Enter your question,then click send."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></TextInput>
              <Button
                label="Send"
                size="md"
                kind="primary"
                isSelected={true}
                renderIcon={Send}
                onClick={handleCommit}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
