package core

type LaunchLibrary2Error struct {
	IsLaunchLibrary2Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLaunchLibrary2Error(code string, msg string, ctx *Context) *LaunchLibrary2Error {
	return &LaunchLibrary2Error{
		IsLaunchLibrary2Error: true,
		Sdk:              "LaunchLibrary2",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LaunchLibrary2Error) Error() string {
	return e.Msg
}
