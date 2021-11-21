export const NetworkAlert = (props) => {
  const { title = 'Danger', bodyMessage = 'Unknown Network Alert', ...otherProps } = props;

  return <div role="alert" class="mt-2 mb-2">
  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
    {title}
  </div>
  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>{bodyMessage}</p>
  </div>
</div>
 }

 export default NetworkAlert;
