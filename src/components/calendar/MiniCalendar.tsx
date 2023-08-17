/*eslint-disable*/
import Calendar from 'react-calendar';
import Card from 'components/card';
import 'react-calendar/dist/Calendar.css';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import 'assets/css/MiniCalendar.css';
import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {dateState} from "../../context/atom";

const MiniCalendar: React.FC = () => {
    const [value, onChange] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const [date, setDate] = useRecoilState(dateState)

    // 선택된 날짜를 yyyy-mm-dd 형식으로 변환하는 함수
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 선택된 날짜 변경 시 호출되는 함수
    const handleDateChange = (date: Date) => {
        onChange(date);
        const formattedDate = formatDate(date);
        console.log('선택된 날짜:', formattedDate);
        setIsSelected(true)
        setSelectedDate(formattedDate)
        setDate(selectedDate);
    };

    return (
        <div>
            <Card extra="flex w-full h-full flex-col px-3 py-3">
                {isSelected && (
                    <div>
                        {selectedDate}
                    </div>
                )}
                <Calendar
                    onChange={onChange}
                    onClickDay={handleDateChange}
                    value={value}
                    prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 "/>}
                    nextLabel={<MdChevronRight className="ml-1 h-6 w-6 "/>}
                    view={'month'}
                />
            </Card>
        </div>
    );
};

export default MiniCalendar;
