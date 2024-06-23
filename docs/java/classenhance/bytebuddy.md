# ByteBuddy

## 类定义

``` java
public XXX createType() {
    DynamicType.Builder builder = new ByteBuddy().with(new NamingStrategy.AbstractBase(){
        @Override
        protected String name(TypeDescription typeDescription) {
            return "com.github.callamin." + typeDescription.getSimpleName();
        }
    }).subclass(TypeDescription.Generic.Builder.parameterizedType(XXX.class, String.class).build());
    builder.defineConstructor(Visibility.PUBLIC);
    return builder.make().load(getClass().getClassLoader(), ClassLoadingStrategy.Default.WRAPPER).getLoaded().newInstance();
}
```