const Input = ({ icon:Icon, ...props }) => {
    return (
        <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex justify-center items-center pl-3 pointer-events-none">
                <Icon className="size-5 text-green-500" />
            </div>
            <input {...props} className="w-full pl-10 px-3 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200" name="" />
            
        </div>
    )
}

export default Input;