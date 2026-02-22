import { Plus } from 'lucide-react'
import React from 'react'
import AllFood from './AllFood'
import { Link } from 'react-router-dom'

const Foods = () => {
    return (
        <div>
            <div className="mb-6 flex justify-end items-center">
                <Link to="/admin/addFood">
                    <button
                        className="flex items-center  gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                        <Plus size={18} />
                        Add Food
                    </button>
                </Link>
            </div>
            <AllFood />
        </div>
    )
}

export default Foods
