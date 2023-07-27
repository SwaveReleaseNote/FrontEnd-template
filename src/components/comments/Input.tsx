import React from 'react'
import tmpImage from '../../assets/img/avatars/avatar5.png'
import Card from 'components/card'

export default function Input(): JSX.Element {
    // 작성 내용

    // 등록 버튼

    return (
        <div>
            <Card extra={"w-full p-4 h-full"}>
                <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <div className="w-full flex items-center">
                        <div className="">
                            <img className="h-[83px] w-[83px] rounded-lg" src={tmpImage} alt="" />
                        </div>
                        <div className="w-full ml-4 flex-1" >
                            <div>
                                <p className="mt-2 text-sm text-gray-600">
                                    BackEnd Department
                                    <a
                                        className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                                        href=" "
                                    >
                                        testtest
                                    </a>
                                </p>
                                <textarea id="message" className="mt-4 mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                            focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="댓글을 작성해 주세요..."></textarea>

                            </div>
                            <div className=' flex justify-end'>
                                <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">댓글 남기기</button>

                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
